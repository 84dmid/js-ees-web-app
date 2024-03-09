import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { fetchVariant } from '../http/catalogAPI.js';
import { AppContext } from './AppContext.js';
import { priceCalculator } from '../calculators/variantPriceHandler.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const getObjectTypeText = (isObjectTypeLine) => {
    if (isObjectTypeLine === null) {
        return 'Для всех типов объектов';
    } else if (isObjectTypeLine === true) {
        return 'Только для линейных объектов';
    } else {
        return 'Только для нелинейных объектов';
    }
};

const VariantModalWindow = ({ id, show, setShow }) => {
    const { isLoading, basket } = useContext(AppContext);
    let [variant, setVariant] = useState('');
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchVariant(id)
            .then((data) => setVariant(data))
            .finally(() => setFetching(false));
    }, [id]);

    useEffect(() => {
        isLoading.state = fetching ? true : false;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    return (
        <Modal show={show} size="lg" fullscreen="lg-down" onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{variant.survey.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-2">Единица измерения</p>
                <div className="form-control" style={{ background: '#E9ECEF' }}>
                    {variant.unit}
                </div>

                <p className="mb-2 mt-3">Цена единицы измерения</p>
                <div className="form-control" style={{ background: '#E9ECEF' }}>
                    {formatNumberWithSpaces(
                        priceCalculator(
                            basket.variants,
                            variant.dynamicPriceIdAndLevel
                        ) || variant.price
                    )}{' '}
                    ₽
                </div>

                {variant.properties && (
                    <>
                        <p className="mb-2 mt-3">Параметры единицы измерения</p>
                        <div
                            className="form-control"
                            style={{ background: '#E9ECEF' }}
                            dangerouslySetInnerHTML={{
                                __html: variant.properties?.replace(/\n/g, '<br>') || '-',
                            }}
                        />
                    </>
                )}

                <p className="mb-2 mt-3">Вариант расчёта объёма исследования</p>
                <div
                    className="form-control"
                    style={{ background: '#E9ECEF' }}
                    dangerouslySetInnerHTML={{
                        __html: variant.description?.replace(/\n/g, '<br>') || '-',
                    }}
                />

                <p className="mb-2 mt-3">
                    Тип объекта капитального строительства, для которого подходит вариант
                </p>
                <div className="form-control" style={{ background: '#E9ECEF' }}>
                    {getObjectTypeText(variant.isObjectTypeLine)}
                </div>

                <p className="mb-2 mt-3">
                    Обоснование включения исследования в состав изысканий
                </p>
                <div
                    className="form-control"
                    style={{ background: '#E9ECEF' }}
                    dangerouslySetInnerHTML={{
                        __html: variant.normDoc?.replace(/\n/g, '<br>') || '-',
                    }}
                />

                {variant.justification && (
                    <>
                        <p className="mb-2 mt-3">Обоснование принятого объёма работ</p>
                        <div
                            className="form-control mb-3"
                            style={{ background: '#E9ECEF' }}
                            dangerouslySetInnerHTML={{
                                __html:
                                    variant.justification?.replace(/\n/g, '<br>') || '-',
                            }}
                        />
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default VariantModalWindow;
