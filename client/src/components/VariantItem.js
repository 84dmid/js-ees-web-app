import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import basketAPI from '../http/basketAPI.js';
import { AppContext } from '../components/AppContext.js';
import { quantityCalculators } from '../calculators/quantityCalculators.js';
import { priceCalculator } from '../calculators/variantPriceHandler.js';
import VariantModalWindow from './VariantModalWindow.js';

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
        defaultQuantity = null,
        unitPrice,
        isObjectTypeLine,
        dynamicUnitPriceIdAndLevel,
        quantityCalculatorName = null,
    }) => {
        const { basket } = useContext(AppContext);
        const [quantity, setQuantity] = useState(defaultQuantity || 1);
        const [isChecked, setIsChecked] = useState(false);
        const [dynamicUnitPrice, setDynamicUnitPrice] = useState('');
        const [isShowModal, setIsShowModal] = useState(false);

        const handleChangeQuantity = (quantity) => {
            setQuantity(quantity); // срабатывает асинхронно, сразу использовать quantity нельзя
            if (quantity <= 0) return;
            if (basket.variants.includes(id)) {
                basketAPI
                    .update(id, quantity)
                    .then((data) => {
                        basket.variants = data.basketVariants;
                    })
                    .catch((error) =>
                        console.error(
                            `Updating variant quantity in basket error: ${error}`
                        )
                    );
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
            if (!quantityCalculatorName) return;
            handleChangeQuantity(
                quantityCalculators[quantityCalculatorName]({
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
                    priceCalculator(basket.variants, dynamicUnitPriceIdAndLevel)
                );
            }
            // eslint-disable-next-line
        }, [basket.variants]);

        return (
            <>
                {isShowModal && (
                    <VariantModalWindow
                        show={isShowModal}
                        setShow={setIsShowModal}
                        id={id}
                    />
                )}

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
                        {/* <Button
                            variant={isShowModal ? 'primary' : 'outline-primary'}
                            className="pt-0 pb-1"
                            onClick={() => setIsShowModal(true)}
                        >
                            {'>>'}
                        </Button> */}
                        <Button
                            size="lg"
                            variant={isShowModal ? 'primary' : 'outline-primary'}
                            className="pt-0 pb-0"
                            onClick={() => setIsShowModal(true)}
                        >
                            {'?'}
                        </Button>
                    </td>
                    <td className="text-center align-middle">{unit}</td>
                    <td className="text-center align-middle" style={{ width: '6em' }}>
                        <Form.Control
                            disabled={
                                quantityCalculatorName || defaultQuantity !== null
                                    ? true
                                    : false
                            }
                            type="number"
                            id={id + 'quantity'}
                            className="pt-0 pb-0"
                            value={quantity}
                            onChange={(event) => handleChangeQuantity(event.target.value)}
                            min={1}
                        />
                    </td>
                    <td
                        className="text-center fw-bold align-middle"
                        style={{ width: '7em', whiteSpace: 'nowrap' }}
                    >
                        {formatNumberWithSpaces(
                            (dynamicUnitPrice || unitPrice) * quantity
                        )}{' '}
                        ₽
                    </td>
                </tr>
            </>
        );
    }
);

export default VariantItem;
