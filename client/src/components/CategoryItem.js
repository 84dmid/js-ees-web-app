import React from 'react';

import SubcategoryItem from './SubcategoryItem.js';

const CategoryItem = ({ name, subcategories }) => {
    const subcategoryList = subcategories.map((subcategory) => {
        return (
            <SubcategoryItem
                key={subcategory.id + 'subcategory'}
                name={subcategory.name}
                surveys={subcategory.surveys}
            />
        );
    });

    return (
        <>
            <tr className="table-secondary">
                <td></td>
                <td colSpan={5}>
                    <h5>{name}</h5>
                </td>
            </tr>
            {subcategoryList}
        </>
    );
};

export default CategoryItem;
