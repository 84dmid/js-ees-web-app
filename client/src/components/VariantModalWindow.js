import React from 'react';
import { Modal } from 'react-bootstrap';

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

const VariantModalWindow = ({
    id,
    show,
    setShow,
    description,
    unit,
    price,
    isObjectTypeLine,
    quantity,
    normDoc,
    surveyName,
    properties,
    justification,
}) => {
    return (
        <Modal show={show} size="lg" fullscreen="lg-down" onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{surveyName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-2">Единица измерения</p>
                <div className="form-control" style={{ background: '#E9ECEF' }}>
                    {unit}
                </div>

                <p className="mb-2 mt-3">Цена единицы измерения</p>
                <div className="form-control" style={{ background: '#E9ECEF' }}>
                    {formatNumberWithSpaces(price)} ₽
                </div>

                {properties && (
                    <>
                        <p className="mb-2 mt-3">Параметры единицы измерения</p>
                        <div
                            className="form-control"
                            style={{ background: '#E9ECEF' }}
                            dangerouslySetInnerHTML={{
                                __html: properties?.replace(/\n/g, '<br>') || '-',
                            }}
                        />
                    </>
                )}

                <p className="mb-2 mt-3">Вариант расчёта объёма исследования</p>
                <div
                    className="form-control"
                    style={{ background: '#E9ECEF' }}
                    dangerouslySetInnerHTML={{
                        __html: description?.replace(/\n/g, '<br>') || '-',
                    }}
                />

                {/* <p className="mb-2 mt-3">
                    Тип объекта капитального строительства, для которого подходит вариант
                </p>
                <div className="form-control" style={{ background: '#E9ECEF' }}>
                    {getObjectTypeText(isObjectTypeLine)}
                </div>

                <p className="mb-2 mt-3">
                    Обоснование включения исследования в состав изысканий
                </p>
                <div
                    className="form-control"
                    style={{ background: '#E9ECEF' }}
                    dangerouslySetInnerHTML={{
                        __html: normDoc?.replace(/\n/g, '<br>') || '-',
                    }}
                /> */}

                {justification && (
                    <>
                        <p className="mb-2 mt-3">Обоснование принятого объёма работ</p>
                        <div
                            className="form-control mb-3"
                            style={{ background: '#E9ECEF' }}
                            dangerouslySetInnerHTML={{
                                __html: justification?.replace(/\n/g, '<br>') || '-',
                            }}
                        />
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default VariantModalWindow;
