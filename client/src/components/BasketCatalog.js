import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { fetchCatalog } from '../http/catalogAPI.js';
import CategoryItem from './CategoryItem.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

const BasketCatalog = observer(() => {
    const { catalog, basket, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const variantIds = basket.variants.map((item) => item.variantId);
        fetchCatalog({ variantIds: variantIds })
            .then((data) => {
                catalog.content = data;
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

    const categoryList = catalog.content.map((category) => {
        return (
            <CategoryItem
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
                <p className="mb-1">Параметры авторасчёта </p>
                <ul>
                    <li className="mb-1">
                        Тип объекта, планируемый к строительству на участке изысканий –{' '}
                        <b>{basket.getObjectTypeName()}</b>
                    </li>

                    <li className="mb-1">
                        Площадь участка изысканий –{' '}
                        <b>{+basket.lendAreaInSqM / 10000} га</b>
                    </li>
                    <li className="mb-1">
                        Количество площадок отбора проб грунтов на 5 га –{' '}
                        <b>
                            не менее {basket.testingSitesNumberPerFiveHa} площад
                            {basket.testingSitesNumberPerFiveHa === 1 ? 'ки' : 'ок'} на 5
                            га
                        </b>
                    </li>
                </ul>
            </>
        );
    }

    return (
        <>
            <p className="mb-1">
                Количество выбранных позиций – <b>{basket.count}</b>
            </p>
            <p className="mb-3">
                Общая стоимость выбранных позиций –{' '}
                <b>{formatNumberWithSpaces(basket.sum)} ₽</b>
            </p>

            {basketParams}

            <Table hover size="sm" className="mb-0 mt-4">
                <thead>
                    <tr>
                        <th className="align-middle text-center"></th>
                        <th className="align-middle text-center">
                            Краткое описание варианта
                        </th>
                        <th className="align-middle text-center"></th>
                        <th className="align-middle text-center">Ед. изм.</th>
                        <th className="align-middle text-center" style={{ width: '5em' }}>
                            Количество
                        </th>
                        <th className="align-middle text-center" style={{ width: '7em' }}>
                            Цена
                        </th>
                    </tr>
                </thead>
                <tbody>{categoryList}</tbody>
            </Table>
        </>
    );
});

export default BasketCatalog;
