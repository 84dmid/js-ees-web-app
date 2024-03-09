import React from 'react';

import BasketSurveyItem from './BasketSurveyItem.js';

const BasketSubcategoryItem = ({ name, surveys }) => {
    const surveyList = surveys.map((survey) => {
        return (
            <BasketSurveyItem
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
                <td colSpan={7}>
                    <p className="m-0" style={{ fontSize: '1.1em' }}>
                        {name}
                    </p>
                </td>
            </tr>
            <tr>
                <td className=" small align-middle text-center">
                    Вид исследования (работы)
                </td>
                <td className="small align-middle text-center">Единица измерения</td>
                <td className="small align-middle text-center" style={{ width: '7,5em' }}>
                    Цена ед. изм.<span className="text-danger">*</span>
                </td>
                <td className=" small align-middle text-center" style={{ width: '4em' }}>
                    Кол-во
                </td>
                <td
                    className=" small align-middle text-center"
                    style={{ width: '7,5em' }}
                >
                    Общая цена
                </td>
                <td className=" small align-middle text-center">
                    Дополнительные параметры единицы измерения
                </td>
                <td className=" small align-middle text-center">
                    Обоснование принятого объёма работ
                </td>
            </tr>
            {surveyList}
        </>
    );
};

export default BasketSubcategoryItem;
