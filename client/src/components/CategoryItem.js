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
            <tr className="table-light">
                <td></td>
                <td colSpan={5}>
                    {/* <div style={{ fontSize: '0.875em' }}>Категория исследований</div> */}
                    <h5>{name}</h5>
                </td>
            </tr>
            {subcategoryList}
        </>
    );
};

export default CategoryItem;
