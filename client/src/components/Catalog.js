import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AppContext } from './AppContext.js';
import { fetchCatalog } from '../http/catalogAPI.js';
import CategoryItem from './CategoryItem.js';

const Catalog = observer(() => {
    const { catalog, isLoading, basket } = useContext(AppContext);
    const [fetching, setFetching] = useState(false);

    // useEffect(() => {
    //     fetchCatalog({
    //         categoryIds: catalog.checkedCategories,
    //         subcategoryIds: catalog.checkedSubcategories,
    //         objectTypeIds: catalog.checkedObjectTypes,
    //         surveyIds: catalog.surveyFilter,
    //         variantIds: catalog.variantFilter,
    //         isObjectTypeLine: basket.isObjectTypeLine,
    //     })
    //         .then((data) => (catalog.content = data))
    //         .finally(() => setFetching(false));
    //     // eslint-disable-next-line
    // }, [
    //     catalog.checkedCategories,
    //     catalog.checkedSubcategories,
    //     catalog.checkedObjectTypes,
    //     catalog.surveyFilter,
    //     catalog.variantFilter,
    //     basket.isObjectTypeLine,
    // ]);

    // useEffect(() => {
    //     isLoading.state = fetching ? true : false;
    //     // eslint-disable-next-line
    // }, [fetching]);

    // if (fetching) {
    //     return null;
    // }

    const categoryList = catalog.content.map((category) => {
        return (
            <CategoryItem
                key={category.id + 'category'}
                name={category.name}
                subcategories={category.subcategories}
            />
        );
    });

    if (!categoryList.length) {
        return <>Исследования не найдены в базе данных</>;
    }

    return (
        <>
            <h1>Конструктор состава изысканий</h1>
            <p className="mt-0 mb-1">
                <small>
                    * Указаны ориентировочные цены, на вкладке{' '}
                    <Link>проект изысканий</Link> можно сформировать запрос на
                    коммерческое предложение.
                </small>
            </p>
            <p className="mt-0 mb-1">
                <small style={{ fontSize: '0.85em' }}>
                    ** Для каждого вида исследований можно выбрать только один вариант
                    определения объёма работ.
                </small>
            </p>
            <Table size="sm" className="mb-0">
                <tbody>{categoryList}</tbody>
            </Table>
        </>
    );
});

export default Catalog;
