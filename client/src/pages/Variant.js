import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

import { fetchVariant } from '../http/catalogAPI.js';
import { AppContext } from '../components/AppContext.js';
import { getLevelPriceById } from '../handlers/variantPriceHandler.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const Variant = () => {
    const { isLoading, basket } = useContext(AppContext);
    const { id } = useParams();
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
        <Container fluid>
            <Row className="border-top border-bottom pb-2 mb-2">
                <Col sm={9}>
                    <h3>{variant.survey.name}</h3>
                </Col>
                <Col sm={3}>
                    <NavLink to={`/`} className="btn btn-outline-primary w-100 mt-2">
                        Перейти в каталог
                    </NavLink>
                </Col>
            </Row>

            <p className="mb-2 mt-3">Цена единицы измерения</p>
            <div className="form-control" style={{ background: '#E9ECEF' }}>
                {formatNumberWithSpaces(
                    getLevelPriceById(basket.variants, variant.dynamicPriceIdAndLevel) ||
                        variant.price
                )}{' '}
                ₽
            </div>

            <p className="mb-2 mt-3">Единица измерения</p>
            <div className="form-control" style={{ background: '#E9ECEF' }}>
                {variant.unit}
            </div>

            <p className="mb-2 mt-3">Тип объекта капитального строительства</p>
            <div className="form-control" style={{ background: '#E9ECEF' }}>
                {variant.objectType.name}
            </div>

            <p className="mb-2 mt-3">
                Документ, обосновывающий включение исследования в состав изысканий
            </p>
            <div
                className="form-control"
                style={{ background: '#E9ECEF' }}
                dangerouslySetInnerHTML={{
                    __html: variant.normDoc?.replace(/\n/g, '<br>') || '-',
                }}
            />

            <p className="mb-2 mt-3">Характеристики одой единицы измерения</p>
            <div
                className="form-control"
                style={{ background: '#E9ECEF' }}
                dangerouslySetInnerHTML={{
                    __html: variant.properties?.replace(/\n/g, '<br>') || '-',
                }}
            />

            <p className="mb-2 mt-3">Наименование варианта</p>
            <div
                className="form-control"
                style={{ background: '#E9ECEF' }}
                dangerouslySetInnerHTML={{
                    __html: variant.description?.replace(/\n/g, '<br>') || '-',
                }}
            />

            <p className="mb-2 mt-3">Обоснование принятого объёма исследований</p>
            <div
                className="form-control mb-3"
                style={{ background: '#E9ECEF' }}
                dangerouslySetInnerHTML={{
                    __html: variant.justification?.replace(/\n/g, '<br>') || '-',
                }}
            />
        </Container>
    );
};

export default Variant;
