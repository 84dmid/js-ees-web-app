import React from 'react';
import { Form } from 'react-bootstrap';

import CategoryFilter from './CategoryFilter.js';
import SubcategoryFilter from './SubcategoryFilter.js';
import ObjectTypeFilter from './ObjectTypeFilter.js';
import CheckedVariantsFilter from './CheckedVariantsFilter.js';

const FilterBar = () => {
    return (
        <Form>
            <CheckedVariantsFilter />
            <CategoryFilter />
            <SubcategoryFilter />
            <ObjectTypeFilter />
        </Form>
    );
};

export default FilterBar;
