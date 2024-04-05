import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AppContext } from './AppContext.js';
import BasketCategoryItem from './BasketCategoryItem.js';
import CalculationInfoShortList from './EESCalculatorComponents/CalculationInfoShortList.js';

const BasketCatalog = observer(() => {
    const { catalog } = useContext(AppContext);

    const categoryList = catalog.projectCatalog.map((category) => {
        return (
            <BasketCategoryItem
                key={category.id + 'category'}
                name={category.name}
                subcategories={category.subcategories}
            />
        );
    });

    const getPlannedSurveysTable = (data, tableName) => {
        let curCategoryNumber = 0;
        let curSubcategoryNumber = 0;
        let curSurveyNumber = 0;
        const rows = [];

        data.forEach((category) => {
            curCategoryNumber += 1;
            curSubcategoryNumber = 0;

            rows.push(
                <tr
                    className="table-secondary"
                    key={category.id + 'Category' + 'SurveysTable' + tableName}
                >
                    {(tableName === 'surveys' || tableName === 'justification') && (
                        <td>{curCategoryNumber}</td>
                    )}
                    <td
                        colSpan={
                            tableName === 'surveys'
                                ? 5
                                : tableName === 'justification'
                                ? 3
                                : 4
                        }
                    >
                        <p className="m-0">{category.name}</p>
                    </td>
                </tr>
            );
            category.subcategories.forEach((subcategory) => {
                curSubcategoryNumber += 1;
                curSurveyNumber = 0;

                rows.push(
                    <React.Fragment
                        key={subcategory.id + 'subcategory' + 'SurveysTable' + tableName}
                    >
                        <tr className="table-light">
                            {(tableName === 'surveys' ||
                                tableName === 'justification') && (
                                <td>{curCategoryNumber + '.' + curSubcategoryNumber}</td>
                            )}

                            <td
                                colSpan={
                                    tableName === 'surveys'
                                        ? 5
                                        : tableName === 'justification'
                                        ? 3
                                        : 4
                                }
                            >
                                <p className="m-0">{subcategory.name}</p>
                            </td>
                        </tr>
                    </React.Fragment>
                );
                subcategory.surveys.forEach((survey) => {
                    curSurveyNumber += 1;
                    rows.push(
                        <tr key={survey.id + 'Survey' + 'SurveysTable' + tableName}>
                            {(tableName === 'surveys' ||
                                tableName === 'justification') && (
                                <td>
                                    {curCategoryNumber +
                                        '.' +
                                        curSubcategoryNumber +
                                        '.' +
                                        curSurveyNumber}
                                </td>
                            )}
                            <td>{survey.name}</td>

                            {(tableName === 'surveys' || tableName === 'small') && (
                                <td className="text-center">{survey.variants[0].unit}</td>
                            )}

                            {(tableName === 'surveys' || tableName === 'small') && (
                                <td className="text-center">
                                    {survey.variants[0].quantity}
                                </td>
                            )}
                            {(tableName === 'surveys' || tableName === 'small') && (
                                <td className="text-center">
                                    {survey.variants[0].quantity *
                                        survey.variants[0].price}
                                </td>
                            )}

                            {tableName === 'surveys' && (
                                <td
                                    style={{ minWidth: '20em' }}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            survey.variants[0].properties?.replace(
                                                /\n/g,
                                                '<br>'
                                            ) || '-',
                                    }}
                                />
                            )}

                            {tableName === 'justification' && (
                                <td
                                    style={{ maxWidth: '100em' }}
                                    // style={{ minWidth: '30em' }}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            survey.variants[0].justification?.replace(
                                                /\n/g,
                                                '<br>'
                                            ) || '-',
                                    }}
                                />
                            )}
                        </tr>
                    );
                });
            });
        });

        return (
            <Table bordered size="sm" className="m-0">
                <thead>
                    <tr>
                        {(tableName === 'surveys' || tableName === 'justification') && (
                            <th className="small align-middle text-center"></th>
                        )}

                        <th className="small align-middle text-center">Вид работы</th>

                        {(tableName === 'surveys' || tableName === 'small') && (
                            <th className="small align-middle text-center">
                                Единица измерения
                            </th>
                        )}

                        {(tableName === 'surveys' || tableName === 'small') && (
                            <th
                                className=" small align-middle text-center"
                                style={{ width: '4em' }}
                            >
                                Кол-во
                            </th>
                        )}

                        {tableName === 'surveys' && (
                            <th className=" small align-middle text-center">
                                Дополнительные параметры единицы измерения
                            </th>
                        )}

                        {tableName === 'justification' && (
                            <th className=" small align-middle text-center">
                                Обоснование принятого объёма работ
                            </th>
                        )}
                        {tableName === 'small' && (
                            <th className=" small align-middle text-center">Цена, ₽</th>
                        )}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    };

    return (
        <>
            <CalculationInfoShortList />

            <p className="mt-1 mb-2">
                <span className="text-danger">*</span> Для уточнения стоимости и объёмов
                работ необходимо <Link>запросить коммерческое предложение</Link>.
            </p>
            <h2 className="mb-2">Состав инженерно-экологических изысканий (ИЭИ)</h2>
            <Table bordered size="sm" className="d-none d-sm-inline mb-0">
                <tbody>{categoryList}</tbody>
            </Table>
            <div className="d d-sm-none">
                {getPlannedSurveysTable(catalog.projectCatalog, 'small')}
            </div>
        </>
    );
});

export default BasketCatalog;
