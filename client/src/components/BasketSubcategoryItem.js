import React from 'react';

import BasketSurveyItem from './BasketSurveyItem.js';

const BasketSubcategoryItem = ({ name, surveys, linkRole }) => {
    const surveyList = surveys.map((survey) => {
        return (
            <BasketSurveyItem
                linkRole={linkRole}
                key={survey.id + 'survey'}
                id={survey.id + 'survey'}
                name={survey.name}
                variants={survey.variants}
            />
        );
    });

    return (
        <>
            <tr className="table-light">
                <td colSpan={linkRole === 'calculation' ? 5 : 7}>
                    <p className="m-0" style={{ fontSize: '1.1em' }}>
                        {name}
                    </p>
                </td>
            </tr>
            <tr>
                <td className="small align-middle text-center text-muted">
                    Вид исследования (работы)
                </td>
                <td className="small align-middle text-center text-muted">
                    Единица измерения
                </td>

                {!linkRole && (
                    <td
                        className="small align-middle text-center text-muted"
                        style={{ width: '7,5em' }}
                    >
                        Цена ед. изм.<span className="text-danger">*</span>
                    </td>
                )}
                <td
                    className=" small align-middle text-center text-muted"
                    style={{ width: '4em' }}
                >
                    Кол-во
                </td>

                {!linkRole && (
                    <td
                        className=" small align-middle text-center text-muted"
                        style={{ width: '7,5em' }}
                    >
                        Общая цена<span className="text-danger">*</span>
                    </td>
                )}
                <td className=" small align-middle text-center text-muted">
                    Дополнительные параметры единицы измерения
                </td>
                <td className=" small align-middle text-center text-muted">
                    Обоснование принятого объёма работ
                </td>
            </tr>
            {surveyList}
        </>
    );
};

export default BasketSubcategoryItem;
