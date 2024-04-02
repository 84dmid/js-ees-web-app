import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import CheckedVariantsFilter from './CheckedVariantsFilter.js';
import { AppContext } from './AppContext.js';

const FilterBar = observer(() => {
    const { catalog } = useContext(AppContext);

    return (
        <Form style={{ display: catalog.projectVariants.length > 0 ? true : 'none' }}>
            <fieldset>
                <legend>Фильтры</legend>
                <CheckedVariantsFilter />
            </fieldset>
        </Form>
    );
});

export default FilterBar;
