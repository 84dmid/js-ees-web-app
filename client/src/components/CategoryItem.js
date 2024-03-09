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
                {/* <td></td> */}
                <td colSpan={6}>
                    {/* <p style={{ fontSize: '0.875em' }} className="m-0">
                        Тип исследований
                    </p> */}
                    <p className="m-0" style={{ fontSize: '1.2em' }}>
                        {name}
                    </p>
                </td>
            </tr>
            {subcategoryList}
        </>
    );
};

export default CategoryItem;
