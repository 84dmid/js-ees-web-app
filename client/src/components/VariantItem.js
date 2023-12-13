import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const VariantItem = ({ surveyId, id, description, unit, unitPrice }) => {
    const [price, setPrice] = useState(0);
    const getPrice = (event) => {
        if (event.target.value < 0) return;
        setPrice(event.target.value * unitPrice);
    };

    function clickRadio(event) {
        const radio = event.target;
        const radios = document.querySelectorAll(
            "input[type='radio'][name='" + radio.name + "']"
        );
        for (var i = 0; i < radios.length; i++) {
            if (radios[i] !== radio) radios[i].BeforeCheck = false;
        }

        if (radio.BeforeCheck) radio.checked = false;
        radio.BeforeCheck = radio.checked;
    }

    return (
        <tr key={id}>
            <td className="text-center align-middle">
                <Form.Check
                    inline
                    type="radio"
                    id={id}
                    name={surveyId + 'survey'}
                    className="m-2 mt-0 mb-0"
                    onClick={(event) => clickRadio(event)}
                />
            </td>

            <td className="align-middle">
                <label htmlFor={id}>{description}</label>
            </td>
            <td className="text-center align-middle">{unit}</td>
            <td className="text-center align-middle">{unitPrice} руб</td>
            <td className="text-center align-middle">
                <Form.Control
                    type="number"
                    defaultValue={0}
                    className="pt-0 pb-0"
                    onChange={(event) => getPrice(event)}
                />
            </td>
            <td className="text-center fw-bold align-middle">{price} руб</td>
        </tr>
    );
};

export default VariantItem;
