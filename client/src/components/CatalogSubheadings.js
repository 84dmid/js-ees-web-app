import React from 'react';
const CatalogSubheadings = () => {
    return (
        <tr>
            <td colSpan={3} className="small text-muted align-bottom">
                Варианты расчёта количества единиц измерения:
            </td>
            <td className="small text-muted align-bottom text-center">Ед. изм.</td>
            <td className="small text-muted align-bottom text-center">Количество</td>
            <td className="small text-muted align-bottom text-center">
                Цена <span className="text-danger">*</span>
            </td>
        </tr>
    );
};

export default CatalogSubheadings;
