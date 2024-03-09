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
                {/* <td></td> */}
                <td colSpan={6}>
                    {/* <p style={{ fontSize: '0.875em' }} className="m-0">
                        Подтип исследований
                    </p> */}
                    <p className="m-0" style={{ fontSize: '1.1em' }}>
                        {name}
                    </p>
                </td>
            </tr>
            {surveyList}
        </>
    );
};

export default SubcategoryItem;
