import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
    Table,
    Button,
    Form,
    FloatingLabel,
    InputGroup,
    Row,
    Col,
} from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { createCategory, fetchFullCatalog } from '../http/catalogAPI.js';
import CategoryItemEditor from './CategoryItemEditor.js';
import { fetchScenario, fetchScenarios } from '../http/scenarioAPI.js';

const initFilter = {
    isSubcategoriesHidden: false,
    isSurveysHidden: false,
    isVariantsHidden: false,
};

const CatalogEditor = observer(() => {
    const { isLoading, catalogEditor } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);
    const [catalogEditingToggle, setCatalogEditingToggle] = useState(false);
    const [filter, setFilter] = useState(initFilter);
    const [scenarios, setScenarios] = useState([]);
    const [isScenarioFilter, setIsScenarioFilter] = useState('');

    useEffect(() => {
        fetchFullCatalog({
            scenarioId: isScenarioFilter ? catalogEditor.curScenario?.id : undefined,
        })
            .then((data) => {
                catalogEditor.content = data;
            })
            .finally(() => {
                setFetching(false);
            });
        // eslint-disable-next-line
    }, [catalogEditingToggle, isScenarioFilter]);

    useEffect(() => {
        fetchScenarios({ isObjectTypeLine: [true, false] })
            .then((data) => {
                setScenarios(data);
            })
            .catch((error) => console.error(`Survey scenarios fetching error: ${error}`))
            .finally(() => setFetching(false));
    }, []);

    useEffect(() => {
        isLoading.state = fetching;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const scenariosList = scenarios.map((item) => {
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

    const categoryList = catalogEditor.content.map((category) => {
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

    const handleChangeScenario = (event) => {
        if (!event.target.value) {
            catalogEditor.curScenario = [];
        } else {
            fetchScenario(+event.target.value)
                .then((data) => (catalogEditor.curScenario = data))
                .catch((error) => console.error(`Scenario fetching error: ${error}`));
        }
    };

    return (
        <>
            <h4>Редактор каталога</h4>

            <div className="mt-2 mb-2">
                <Form.Group>
                    <Form.Check
                        inline
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
                        inline
                        label="Скрыть подкатегории"
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
                        inline
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
                        inline
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
                <Form.Label htmlFor="scenarioSelector">
                    Выберите редактируемый сценарий из списка
                </Form.Label>
                <InputGroup className="mt-0 mb-2">
                    {/* <FloatingLabel
                        label="Выберите редактируемый сценарий из списка"
                        controlId="scenarioSelector"
                    > */}
                    <Form.Select
                        id="scenarioSelector"
                        value={
                            Object.keys(catalogEditor.curScenario).length !== 0
                                ? catalogEditor.curScenario.id
                                : ''
                        }
                        onChange={handleChangeScenario}
                    >
                        <option value="">...</option>
                        {scenariosList}
                    </Form.Select>
                    {/* </FloatingLabel> */}
                    <InputGroup.Checkbox
                        disabled={catalogEditor.curScenario.id ? false : true}
                        id="scenarioVariantsFilter"
                        checked={isScenarioFilter}
                        onChange={(event) => setIsScenarioFilter(event.target.checked)}
                    />
                    <InputGroup.Text> Фильтровать</InputGroup.Text>
                </InputGroup>
            </div>

            <Table size="sm" className="mb-0">
                <tbody style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <tr>
                        <td colSpan={5}></td>
                        <td colSpan={2}>
                            <Button
                                className="w-100 text-start"
                                size="sm"
                                variant="outline-primary"
                                onClick={handleCreateClick}
                            >
                                ➕ Категория
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
