import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { fetchSurveys } from '../http/catalogAPI.js';
import CategoryItem from './CategoryItem.js';
import SubcategoryItem from './SubcategoryItem.js';
import SurveyItem from './SurveyItem.js';

const SurveyList = observer(() => {
    const { catalog, isLoading } = useContext(AppContext);
    const [surveysFetching, setSurveysFetching] = useState(true);

    useEffect(() => {
        fetchSurveys()
            .then((data) => (catalog.surveys = data))
            .finally(() => setSurveysFetching(false));
        // eslint-disable-next-line
    }, []);

    if (surveysFetching) {
        isLoading.state = true;
        return <></>;
    }

    const surveyCatalog = [];

    let curCategoryId;
    let curSubcategoryId;

    catalog.surveys.forEach((survey) => {
        if (curCategoryId !== survey.category.id) {
            curCategoryId = survey.category.id;
            surveyCatalog.push(
                <CategoryItem
                    key={survey.category.id + 'category'}
                    category={survey.category}
                />
            );
        }

        if (curSubcategoryId !== survey.subcategory.id) {
            curSubcategoryId = survey.subcategory.id;
            surveyCatalog.push(
                <SubcategoryItem
                    key={survey.subcategory.id + 'subcategory'}
                    subcategory={survey.subcategory}
                />
            );
        }

        surveyCatalog.push(
            <SurveyItem
                key={survey.id + 'survey'}
                id={survey.id}
                name={survey.name}
                variants={survey.variants}
            />
        );
    });

    return (
        <Table hover size="sm" className="mb-0">
            <thead>
                <tr>
                    <th className="align-middle text-center"></th>
                    <th className="align-middle text-center">
                        Краткое описание варианта
                    </th>
                    <th className="align-middle text-center">Ед. изм.</th>
                    <th className="align-middle text-center">Цена ед. изм.</th>
                    <th className="align-middle text-center" style={{ width: '5em' }}>
                        Количество
                    </th>
                    <th className="align-middle text-center">Стоимость</th>
                </tr>
            </thead>
            <tbody>{surveyCatalog}</tbody>
        </Table>
    );
});

export default SurveyList;
