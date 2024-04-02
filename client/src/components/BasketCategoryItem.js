import React from 'react';

import BasketSubcategoryItem from './BasketSubcategoryItem.js';

const BasketCategoryItem = ({ name, subcategories, linkRole }) => {
    const subcategoryList = subcategories.map((subcategory) => {
        return (
            <BasketSubcategoryItem
                key={subcategory.id + 'subcategory'}
                name={subcategory.name}
                surveys={subcategory.surveys}
                linkRole={linkRole}
            />
        );
    });

    return (
        <>
            <tr className="table-secondary">
                <td colSpan={linkRole === 'calculation' ? 5 : 7}>
                    <p className="m-0" style={{ fontSize: '1.2em' }}>
                        {name}
                    </p>
                </td>
            </tr>
            {subcategoryList}
        </>
    );
};

export default BasketCategoryItem;
