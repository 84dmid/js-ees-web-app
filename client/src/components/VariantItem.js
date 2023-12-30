import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import basketAPI from '../http/basketAPI.js';
import { AppContext } from '../components/AppContext.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const VariantItem = observer(({ surveyId, id, description, unit, unitPrice }) => {
    const { basket } = useContext(AppContext);
    const [quantity, setQuantity] = useState(1);
    const [isChecked, setIsChecked] = useState(false);

    const handleChangeQuantity = (event) => {
        if (event.target.value <= 0) return;
        setQuantity(event.target.value); // срабатывает асинхронно, сразу использовать quantity нельзя
        if (isChecked) {
            basketAPI.update(id, event.target.value).then((data) => {
                basket.variants = data.basketVariants;
            });
        }
    };

    const handleCheckVariant = (event) => {
        setIsChecked(event.target.checked); // срабатывает асинхронно, сразу использовать checked нельзя
        if (event.target.checked && quantity > 0) {
            basketAPI
                .append(id, quantity)
                .then((data) => {
                    basket.variants = data.basketVariants;
                })
                .catch((error) => console.error(`Append in basket error: ${error}`));
        } else if (!event.target.checked || quantity <= 0) {
            basketAPI
                .remove(id)
                .then((data) => {
                    basket.variants = data.basketVariants;
                })
                .catch((error) => console.error(`Remove from basket error: ${error}`));
        }
    };

    useEffect(() => {
        const basketVariant = basket.variants.find((item) => item.variantId === id);
        if (basketVariant) {
            setIsChecked(true);
            setQuantity(basketVariant.quantity);
        } else {
            setIsChecked(false);
        }
        // eslint-disable-next-line
    }, [basket.variants]);

    return (
        <tr key={id}>
            <td className="text-center align-middle">
                <Form.Check
                    inline
                    type="checkbox"
                    id={id}
                    name={surveyId}
                    className="m-2 mt-0 mb-0"
                    checked={isChecked}
                    onChange={handleCheckVariant}
                />
            </td>

            <td className="align-middle">
                <label htmlFor={id}>{description}</label>
            </td>
            <td className="text-center align-middle">
                <NavLink
                    to={`/variant/${id}`}
                    className="btn btn-outline-primary pt-0 pb-1"
                >
                    {'>'}
                </NavLink>
            </td>
            <td className="text-center align-middle">{unit}</td>
            <td className="text-center align-middle">
                <Form.Control
                    type="number"
                    id={id + 'quantity'}
                    className="pt-0 pb-0"
                    value={quantity}
                    onChange={(event) => handleChangeQuantity(event)}
                    min={1}
                />
            </td>
            <td className="text-center fw-bold align-middle">
                {formatNumberWithSpaces(unitPrice * quantity)} ₽
            </td>
        </tr>
    );
});

export default VariantItem;
