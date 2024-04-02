import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AppContext } from './AppContext.js';
import BasketCategoryItem from './BasketCategoryItem.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

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

    let projectParams;
    if (catalog.isObjectTypeLine === true) {
        projectParams = (
            <>
                <li className="mb-1">
                    Протяженность трассы изысканий –{' '}
                    <b>{+catalog.trackLengthInM / 1000} км</b>.
                </li>
                <li className="mb-1">
                    Ширина трассы изысканий – <b>{+catalog.trackWidthInM} м</b>.
                </li>
                <li className="mb-1">
                    Площадь трассы изысканий – <b>{+catalog.lendAreaInSqM / 10000} га</b>.
                </li>
            </>
        );
    } else if (catalog.isObjectTypeLine === false) {
        projectParams = (
            <>
                <li className="mb-1">
                    Площадь участка изысканий – <b>{+catalog.lendAreaInSqM / 10000} га</b>
                    .
                </li>
            </>
        );
    }

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
            <ul className="mt-2 mb-1">
                <li className="mb-1">
                    Ориентировочная стоимость –{' '}
                    <b>{formatNumberWithSpaces(catalog.projectPrice)} ₽</b>.
                </li>
                <li className="mb-1">
                    Количество видов работ – <b>{catalog.projectSurveyCount} шт</b>.
                </li>
                <li className="mb-1">
                    Тип объекта строительства –{' '}
                    <b>
                        {catalog.isObjectTypeLine === null
                            ? 'не выбран'
                            : catalog.isObjectTypeLine
                            ? 'линейный'
                            : 'нелинейный'}
                    </b>
                    .
                </li>
                {projectParams}
                <li className="mb-1">
                    Регион – <b>{catalog.regionName}</b>.
                </li>
            </ul>
            <div
            // className="d-none d-sm-inline"
            >
                <p className="mt-1 mb-2">
                    {/* <small>
                        <span className="text-danger">*</span> Указаны ориентировочные
                        цены, чтобы узнать точную стоимость необходимо{' '}
                        <Link>запросить коммерческое предложение (КП)</Link> у
                        представленных на сайте <Link to="/contractors">подрядчиков</Link>
                        , либо получить ссылку на запрос КП и направить её в любую
                        известную вам организацию.
                    </small> */}
                    {/* <small> */}
                    <span className="text-danger">*</span> Для уточнения стоимости и
                    объёмов работ необходимо{' '}
                    <Link>запросить коммерческое предложение</Link>.{/* </small> */}
                </p>
                <h2 className="mb-2">Состав инженерно-экологических изысканий (ИЭИ)</h2>
                <Table bordered size="sm" className="d-none d-sm-inline mb-0">
                    <tbody>{categoryList}</tbody>
                </Table>
                <div className="d d-sm-none">
                    {getPlannedSurveysTable(catalog.projectCatalog, 'small')}
                </div>
            </div>
        </>
    );
});

export default BasketCatalog;
