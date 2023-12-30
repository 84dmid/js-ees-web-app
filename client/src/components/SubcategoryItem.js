import React from 'react';

import SurveyItem from './SurveyItem.js';

const SubcategoryItem = ({ name, surveys }) => {
    const surveyList = surveys.map((survey) => {
        return (
            <SurveyItem
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
                <td></td>
                <td colSpan={5}>
                    {/* <div style={{ fontSize: '0.875em' }}>Подкатегория исследований</div> */}
                    <h6>{name}</h6>
                </td>
            </tr>
            {surveyList}
        </>
    );
};

export default SubcategoryItem;
