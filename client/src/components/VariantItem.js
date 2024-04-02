import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import basketAPI from '../http/basketAPI.js';
import { AppContext } from '../components/AppContext.js';
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
        surveyName,
        id,
        description,
        normDoc,
        properties,
        unit,
        defaultQuantity = null,
        unitPrice,
        isObjectTypeLine,
        quantityCalculatorName = null,
        quantity,
        checked,
        justification,
    }) => {
        const { catalog } = useContext(AppContext);
        const [isShowModal, setIsShowModal] = useState(false);

        const handleChangeQuantity = (newQuantity) => {
            if (newQuantity <= 0) return;
            if (
                catalog.projectVariants.map((variant) => variant.variantId).includes(id)
            ) {
                basketAPI
                    .update(id, newQuantity)
                    .then((data) => {
                        catalog.projectVariants = data.basketVariants;
                    })
                    .catch((error) =>
                        console.error(
                            `Updating variant quantity in basket error: ${error}`
                        )
                    );
            }
        };

        const handleCheckVariant = (event) => {
            if (event.target.checked && quantity > 0) {
                basketAPI
                    .append(id, quantity)
                    .then((data) => {
                        catalog.projectVariants = data.basketVariants;
                    })
                    .catch((error) => console.error(`Append in basket error: ${error}`));
            } else if (!event.target.checked || quantity <= 0) {
                basketAPI
                    .remove(id)
                    .then((data) => {
                        catalog.projectVariants = data.basketVariants;
                    })
                    .catch((error) =>
                        console.error(`Remove from basket error: ${error}`)
                    );
            }
        };

        return (
            <>
                {isShowModal && (
                    <VariantModalWindow
                        show={isShowModal}
                        setShow={setIsShowModal}
                        id={id}
                        description={description}
                        unit={unit}
                        price={unitPrice}
                        isObjectTypeLine={isObjectTypeLine}
                        quantity={quantity}
                        normDoc={normDoc}
                        surveyName={surveyName}
                        properties={properties}
                        justification={justification}
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
                            checked={checked}
                            onChange={handleCheckVariant}
                        />
                    </td>

                    <td className="align-middle">
                        <label htmlFor={id}>{description}</label>
                    </td>
                    <td className="text-center align-middle">
                        <Button
                            size="lg"
                            variant={isShowModal ? 'primary' : 'outline-primary'}
                            className="pt-0 pb-1"
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
                        {formatNumberWithSpaces(unitPrice * quantity)} ₽
                    </td>
                </tr>
            </>
        );
    }
);

export default VariantItem;
