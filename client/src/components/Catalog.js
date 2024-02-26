import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { fetchCatalog } from '../http/catalogAPI.js';
import CategoryItem from './CategoryItem.js';

const Catalog = observer(() => {
    const { catalog, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchCatalog({
            categoryIds: catalog.checkedCategories,
            subcategoryIds: catalog.checkedSubcategories,
            objectTypeIds: catalog.checkedObjectTypes,
            surveyIds: catalog.surveyFilter,
            variantIds: catalog.variantFilter,
        })
            .then((data) => (catalog.content = data))
            .finally(() => setFetching(false));
        // eslint-disable-next-line
    }, [
        catalog.checkedCategories,
        catalog.checkedSubcategories,
        catalog.checkedObjectTypes,
        catalog.surveyFilter,
        catalog.variantFilter,
    ]);

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

    if (!categoryList.length) {
        return <>Исследования не найдены в базе данных</>;
    }

    return (
        <Table hover size="sm" className="mb-0">
            <thead>
                <tr>
                    <th className="align-middle text-center"></th>
                    <th className="align-middle text-center">
                        Краткое описание варианта
                    </th>
                    <th className="align-middle text-center"></th>
                    <th className="align-middle text-center">Ед. изм.</th>
                    <th
                        className="align-middle text-center"
                        style={{ width: '6em', whiteSpace: 'nowrap' }}
                    >
                        Количество
                    </th>
                    <th className="align-middle text-center" style={{ width: '7em' }}>
                        Цена
                    </th>
                </tr>
            </thead>
            <tbody>{categoryList}</tbody>
        </Table>
    );
});

export default Catalog;
