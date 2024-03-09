import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AppContext } from './AppContext.js';
import { fetchCatalog } from '../http/catalogAPI.js';
import BasketCategoryItem from './BasketCategoryItem.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const BasketCatalog = observer(() => {
    const { basket, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const variantIds = basket.variants.map((item) => item.variantId);
        fetchCatalog({
            variantIds: variantIds,
            isObjectTypeLine: basket.isObjectTypeLine,
        })
            .then((data) => {
                basket.content = data;
            })
            .catch((error) => console.error(`Fetching catalog error: ${error}`))
            .finally(() => setFetching(false));
        // eslint-disable-next-line
    }, [basket.variants]);

    useEffect(() => {
        isLoading.state = fetching ? true : false;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const categoryList = basket.content.map((category) => {
        return (
            <BasketCategoryItem
                key={category.id + 'category'}
                name={category.name}
                subcategories={category.subcategories}
            />
        );
    });

    let basketParams;
    if (basket.isObjectTypeLine === true) {
        basketParams = (
            <ul>
                <li className="mb-1">
                    Тип объекта, планируемый к строительству на участке изысканий –{' '}
                    <b>линейный</b>
                </li>
                ;
                <li className="mb-1">
                    Ширина трассы изысканий – <b>{+basket.trackWidthInM} м</b>
                </li>
                <li className="mb-1">
                    Протяженность трассы изысканий –{' '}
                    <b>{+basket.trackLengthInM / 1000} км</b>
                </li>
                <li className="mb-1">
                    Площадь трассы изысканий – <b>{+basket.lendAreaInSqM / 10000} га</b>
                </li>
            </ul>
        );
    } else {
        basketParams = (
            <>
                <p className="mb-1">Параметры расчёта состава изысканий:</p>
                <ul>
                    <li className="mb-1">
                        тип объекта, планируемый к строительству на участке изысканий –{' '}
                        <b>{basket.getObjectTypeName()}</b>.
                    </li>
                    <li className="mb-1">
                        площадь участка изысканий –{' '}
                        <b>{+basket.lendAreaInSqM / 10000} га</b>.
                    </li>
                    {/* <li className="mb-1">
                        Количество площадок отбора проб грунтов на 5 га –{' '}
                        <b>
                            не менее {basket.testingSitesNumberPerFiveHa} площад
                            {basket.testingSitesNumberPerFiveHa === 1 ? 'ки' : 'ок'} на 5
                            га
                        </b>
                    </li> */}
                </ul>
            </>
        );
    }

    return (
        <>
            <p className="mb-1">
                Ориентировочная стоимость проведения инженерно-экологических изысканий –{' '}
                <b>{formatNumberWithSpaces(basket.sum)} ₽</b>
            </p>
            <p className="mb-3">
                Количество видов исследований и работ, включённое в состав изысканий –{' '}
                <b>{basket.count} шт.</b>
            </p>

            {basketParams}

            <h2 className="mb-0">Состав инженерно-экологических изысканий</h2>
            <p className="mt-0 mb-0">
                <small>
                    <span className="text-danger">*</span> Цены указаны ориентировочно,
                    чтобы узнать стоимость изысканий необходимо запросить КП у
                    исполнителей, перед формированием запроса нужно обязательно заполнить
                    техническое задание. Запрос на КП можно направить либо через сайт –
                    исполнителям, размещённым на сайте, либо получить ссылку на запрос и
                    направить её в любую известную вам организацию. Также можно разместить
                    запрос КП на тендере сайта.
                </small>
            </p>
            <Table bordered size="sm" className="mb-0 mt-2">
                <tbody>
                    {categoryList}

                    <tr>
                        <td colSpan={4} className="fw-bold">
                            Итого:
                        </td>
                        <td colSpan={3} className="fw-bold">
                            {formatNumberWithSpaces(basket.sum)} ₽
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
});

export default BasketCatalog;
