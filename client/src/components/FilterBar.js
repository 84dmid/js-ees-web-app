import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

// import CategoryFilter from './CategoryFilter.js';
// import SubcategoryFilter from './SubcategoryFilter.js';
import CheckedVariantsFilter from './CheckedVariantsFilter.js';
import { AppContext } from './AppContext.js';

const FilterBar = observer(() => {
    const { basket } = useContext(AppContext);

    return (
        <Form style={{ display: basket.variants.length !== 0 ? 'table-row' : 'none' }}>
            <fieldset>
                <legend>Фильтры</legend>
                <CheckedVariantsFilter />
                {/* <CategoryFilter />
                <SubcategoryFilter /> */}
            </fieldset>
        </Form>
    );
});

export default FilterBar;
