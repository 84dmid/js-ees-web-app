import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Button } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { fetchCatalog, createCategory, fetchFullCatalog } from '../http/catalogAPI.js';
import CategoryItemEditor from './CategoryItemEditor.js';

const CatalogEditor = observer(() => {
    const { catalog, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);
    const [catalogEditingToggle, setCatalogEditingToggle] = useState(false);

    useEffect(() => {
        fetchFullCatalog({})
            .then((data) => {
                catalog.content = data;
            })
            .finally(() => {
                setFetching(false);
            });
        // eslint-disable-next-line
    }, [catalogEditingToggle]);

    useEffect(() => {
        isLoading.state = fetching;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const categoryList = catalog.content.map((category) => {
        return (
            <CategoryItemEditor
                key={category.id + 'category'}
                id={category.id}
                order={category.order}
                name={category.name}
                subcategories={category.subcategories}
                setCatalogEditingToggle={setCatalogEditingToggle}
            />
        );
    });

    const handleCreateClick = () => {
        createCategory({ name: 'new category' })
            .then(() => {
                setFetching(false);
                setCatalogEditingToggle((prevToggle) => !prevToggle);
            })
            .catch((error) => console.error(`Category create error: ${error}`));
    };

    // if (!categoryList.length) {
    //     return <>Исследования не найдены в базе данных</>;
    // }

    return (
        <Table hover size="sm" className="mb-0">
            <thead>
                <tr>
                    <th
                        colSpan={2}
                        className="align-middle text-center"
                        style={{ width: '3em' }}
                    >
                        Порядок
                    </th>
                    <th className="align-middle text-center">
                        Краткое описание варианта
                    </th>
                    <th className="align-middle text-center">Ед. изм.</th>
                    <th className="align-middle text-center">Цена ед. изм.</th>
                    <th className="align-middle text-center">Опции</th>
                </tr>
            </thead>
            <tbody style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <tr>
                    <td colSpan={5}></td>
                    <td>
                        <Button
                            size="sm"
                            variant="outline-primary"
                            className="d-grid w-100 text-start"
                            onClick={handleCreateClick}
                        >
                            ➕↓ Категория
                        </Button>
                    </td>
                </tr>
                {!categoryList.length ? (
                    <tr>
                        <td colSpan={6}>Исследования не найдены в базе данных</td>
                    </tr>
                ) : (
                    <>{categoryList}</>
                )}
            </tbody>
        </Table>
    );
});

export default CatalogEditor;
