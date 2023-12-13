import React from 'react';

const CategoryItem = ({ category }) => {
    return (
        <tr>
            <td className="bg-light"></td>
            <td colSpan={6} className="bg-light">
                <h4 className="text-muted">{category.name}</h4>
            </td>
        </tr>
    );
};

export default CategoryItem;
