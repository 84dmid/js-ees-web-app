import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { fetchCatalog } from '../http/catalogAPI.js';
import CategoryItem from './CategoryItem.js';
import { toJS } from 'mobx';

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
        console.log(variantIds);
        fetchCatalog({ variantIds: variantIds })
            .then((data) => {
                console.log(data);
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
        // if (!category.subcategories[0]?.surveys[0]?.variants[0]) {
        //     return null;
        // }
        return (
            <CategoryItem
                key={category.id + 'category'}
                name={category.name}
                subcategories={category.subcategories}
            />
        );
    });

    return (
        <>
            <p className="mb-1">
                Количество выбранных позиций – <b>{basket.count}</b>
            </p>
            <p>
                Общая стоимость выбранных позиций –{' '}
                <b>{formatNumberWithSpaces(basket.sum)} ₽</b>
            </p>
            <Table hover size="sm" className="mb-0">
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
