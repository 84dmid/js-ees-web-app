import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Button, Form, FloatingLabel } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { createCategory, fetchFullCatalog } from '../http/catalogAPI.js';
import CategoryItemEditor from './CategoryItemEditor.js';
import { fetchSurveyScenarios } from '../http/surveyScenarioAPI.js';

const initFilter = {
    isSubcategoriesHidden: false,
    isSurveysHidden: false,
    isVariantsHidden: false,
};

const CatalogEditor = observer(() => {
    const { catalog, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);
    const [catalogEditingToggle, setCatalogEditingToggle] = useState(false);
    const [filter, setFilter] = useState(initFilter);
    const [surveyScenarios, setSurveyScenarios] = useState([]);

    useEffect(() => {
        fetchSurveyScenarios()
            .then((data) => {
                setSurveyScenarios(data);
            })
            .catch((error) => console.error(`Survey scenarios fetching error: ${error}`))
            .finally(() => setFetching(false));
    }, []);

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

    const surveyScenariosList = surveyScenarios.map((item) => {
        const objectTypeName =
            item.isObjectTypeLine === null
                ? ' __ (тип объектов не определён)'
                : item.isObjectTypeLine
                ? ' __ (линейные объекты)'
                : ' __ (нелинейные объекты)';
        return (
            <option key={item.id + 'scenario'} value={item.id}>
                {item.name}
                {objectTypeName}
            </option>
        );
    });

    const categoryList = catalog.content.map((category) => {
        return (
            <CategoryItemEditor
                key={category.id + 'category'}
                id={category.id}
                order={category.order}
                name={category.name}
                subcategories={category.subcategories}
                setCatalogEditingToggle={setCatalogEditingToggle}
                filter={filter}
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

    return (
        <>
            <div className="border-top border-bottom pb-2 mb-2">
                <Form.Group>
                    <Form.Check
                        label="Показать всё"
                        name="filter"
                        type="radio"
                        id="showAll"
                        checked={
                            !filter.isSubcategoriesHidden &&
                            !filter.isSurveysHidden &&
                            !filter.isVariantsHidden
                        }
                        onChange={(event) => {
                            setFilter(initFilter);
                        }}
                    />
                    <Form.Check
                        label="Скрыть субкатегории"
                        name="filter"
                        type="radio"
                        id="isSubcategoriesHidden"
                        checked={filter.isSubcategoriesHidden}
                        onChange={(event) => {
                            setFilter({
                                ...initFilter,
                                isSubcategoriesHidden: event.target.checked,
                            });
                        }}
                    />
                    <Form.Check
                        label="Скрыть исследования"
                        name="filter"
                        type="radio"
                        id="isSurveysHidden"
                        checked={filter.isSurveysHidden}
                        onChange={(event) => {
                            setFilter({
                                ...initFilter,
                                isSurveysHidden: event.target.checked,
                            });
                        }}
                    />
                    <Form.Check
                        label="Скрыть варианты"
                        name="filter"
                        type="radio"
                        id="isVariantsHidden"
                        checked={filter.isVariantsHidden}
                        onChange={(event) => {
                            setFilter({
                                ...initFilter,
                                isVariantsHidden: event.target.checked,
                            });
                        }}
                    />
                </Form.Group>
            </div>
            <div>
                <FloatingLabel label="Сценарий" controlId="scenarios">
                    <Form.Select>
                        <option value="">...</option>
                        {surveyScenariosList}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <Table hover size="sm" className="mb-0">
                <thead>
                    <tr>
                        <th></th>
                        <th
                            colSpan={1}
                            className="align-middle text-center"
                            style={{ width: '3em' }}
                        ></th>
                        <th className="align-middle text-center">
                            Краткое описание варианта
                        </th>
                        <th className="align-middle text-center">Сце-нарий</th>
                        <th className="align-middle text-center">Ед. изм.</th>
                        <th className="align-middle text-center">Цена ед. изм.</th>
                        <th className="align-middle text-center">Опции</th>
                    </tr>
                </thead>
                <tbody style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <tr>
                        <td colSpan={6}></td>
                        <td>
                            <Button
                                size="sm"
                                variant="outline-primary"
                                className="d-grid w-100 text-start"
                                onClick={handleCreateClick}
                            >
                                ➕Категория
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
        </>
    );
});

export default CatalogEditor;
