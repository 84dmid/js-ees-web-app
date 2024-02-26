import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import basketAPI from '../http/basketAPI.js';
import { AppContext } from '../components/AppContext.js';
import variantHandlers from '../handlers/variantHandlers.js';
import { getLevelPriceById } from '../handlers/variantPriceHandler.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const VariantItem = observer(
    ({
        surveyId,
        id,
        description,
        unit,
        unitPrice,
        dynamicUnitPriceIdAndLevel,
        handler = null,
    }) => {
        const { basket } = useContext(AppContext);
        const [quantity, setQuantity] = useState(1);
        const [isChecked, setIsChecked] = useState(false);
        const [dynamicUnitPrice, setDynamicUnitPrice] = useState('');

        const handleChangeQuantity = (quantity) => {
            setQuantity(quantity); // срабатывает асинхронно, сразу использовать quantity нельзя
            if (quantity <= 0) return;
            if (isChecked) {
                basketAPI.update(id, quantity).then((data) => {
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
                    .catch((error) =>
                        console.error(`Remove from basket error: ${error}`)
                    );
            }
        };

        useEffect(() => {
            if (!handler) return;
            handleChangeQuantity(
                variantHandlers[handler]({
                    lendAreaInSqM: basket.lendAreaInSqM,
                    testingSitesNumberPerFiveHa: basket.testingSitesNumberPerFiveHa,
                    isObjectTypeLine: basket.isObjectTypeLine,
                    trackLengthInM: basket.trackLengthInM,
                })
            );
            // eslint-disable-next-line
        }, [
            basket.isObjectTypeLine,
            basket.lendAreaInSqM,
            basket.testingSitesNumberPerFiveHa,
            basket.trackLengthInM,
        ]);

        useEffect(() => {
            const basketVariant = basket.variants.find((item) => item.variantId === id);
            if (basketVariant) {
                setIsChecked(true);
                setQuantity(basketVariant.quantity);
            } else {
                setIsChecked(false);
            }
            if (dynamicUnitPriceIdAndLevel) {
                setDynamicUnitPrice(
                    getLevelPriceById(basket.variants, dynamicUnitPriceIdAndLevel)
                );
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
                        {'>>'}
                    </NavLink>
                </td>
                <td className="text-center align-middle">{unit}</td>
                <td className="text-center align-middle">
                    <Form.Control
                        disabled={handler ? true : false}
                        type="number"
                        id={id + 'quantity'}
                        className="pt-0 pb-0"
                        value={quantity}
                        onChange={(event) => handleChangeQuantity(event.target.value)}
                        min={1}
                    />
                </td>
                <td className="text-center fw-bold align-middle">
                    {formatNumberWithSpaces((dynamicUnitPrice || unitPrice) * quantity)} ₽
                </td>
            </tr>
        );
    }
);

export default VariantItem;
