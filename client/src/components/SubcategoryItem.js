import React from 'react';

const SubcategoryItem = ({ subcategory }) => {
    return (
        <tr>
            <td className="bg-light"></td>
            <td colSpan={6} className="bg-light">
                <h5 className="text-muted">{subcategory.name}</h5>
            </td>
        </tr>
    );
};

export default SubcategoryItem;
