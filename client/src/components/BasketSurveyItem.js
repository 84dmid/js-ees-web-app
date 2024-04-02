import React from 'react';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const BasketSurveyItem = ({ linkRole, id, name, variants }) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td className="text-center">{variants[0].unit}</td>

                {!linkRole && (
                    <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        {formatNumberWithSpaces(variants[0].price) + ' ₽'}
                    </td>
                )}
                <td className="text-center">{variants[0].quantity}</td>

                {!linkRole && (
                    <td className="text-center fw-bold" style={{ whiteSpace: 'nowrap' }}>
                        {formatNumberWithSpaces(
                            variants[0].price * variants[0].quantity
                        ) + ' ₽'}
                    </td>
                )}
                <td
                    style={{ minWidth: '16em' }}
                    dangerouslySetInnerHTML={{
                        __html: variants[0].properties?.replace(/\n/g, '<br>') || '-',
                    }}
                />

                <td
                    style={{ maxWidth: '100em' }}
                    // style={{ minWidth: '30em' }}
                    dangerouslySetInnerHTML={{
                        __html: variants[0].justification?.replace(/\n/g, '<br>') || '-',
                    }}
                />
            </tr>
        </>
    );
};

export default BasketSurveyItem;
