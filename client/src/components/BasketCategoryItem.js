import React from 'react';

import BasketSubcategoryItem from './BasketSubcategoryItem.js';

const BasketCategoryItem = ({ name, subcategories }) => {
    const subcategoryList = subcategories.map((subcategory) => {
        return (
            <BasketSubcategoryItem
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
                <td colSpan={7}>
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

export default BasketCategoryItem;
