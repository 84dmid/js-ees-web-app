import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';

import { fetchVariant } from '../http/catalogAPI.js';
import { AppContext } from '../components/AppContext.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const Variant = () => {
    const { isLoading } = useContext(AppContext);
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

    const variantProps = variant.variantProps.map((prop) => {
        return (
            <tr key={prop.id + 'variantProp'}>
                <td
                    dangerouslySetInnerHTML={{
                        __html: prop.description.replace(/\n/g, '<br>'),
                    }}
                />
                {/* <td className="text-center">{prop.unit}</td>
                <td className="text-center">{formatNumberWithSpaces(prop.price)} ₽</td>
                <td className="text-center">{prop.quantity}</td> */}
                {/* <td className="text-center">
                    {formatNumberWithSpaces(prop.quantity * prop.price)} ₽
                </td> */}
            </tr>
        );
    });

    const getVariantPriceByProps = variant.variantProps.reduce(
        (sum, prop) => sum + prop.quantity * prop.price,
        0
    );

    // console.log(variant);
    return (
        <Container fluid>
            <h3 className="m-1">{variant.survey.name}</h3>
            <Table size="sm">
                <tbody>
                    <tr>
                        <th>Цена единицы измерения</th>
                        <td>{formatNumberWithSpaces(variant.price)} ₽</td>
                    </tr>
                    <tr>
                        <th>Тип объекта капитального строительства</th>
                        <td>{variant.objectType.name}</td>
                    </tr>
                    <tr>
                        <th>Единица измерения</th>
                        <td>{variant.unit.name}</td>
                    </tr>
                    <tr>
                        <th>Краткое описание варианта</th>
                        <td>{variant.description}</td>
                    </tr>
                    <tr>
                        <th style={{ width: '30em' }}>
                            Документ, обосновывающий включение исследования в состав
                            изысканий
                        </th>
                        <td>{variant.normDoc || <>–</>}</td>
                    </tr>
                    <tr>
                        <th>Способ определения необходимого объёма исследований</th>
                        <td>{variant.justification || <>–</>}</td>
                    </tr>
                </tbody>
            </Table>

            {!!variant.variantProps.length && (
                <>
                    <Table bordered size="sm">
                        <thead>
                            <tr className="table-light">
                                <th>
                                    <h5 className="m-1">
                                        Характеристики одной единицы измерения (
                                        {variant.unit.name})
                                    </h5>
                                </th>
                                {/* <th className="align-middle text-center">Ед. изм.</th>
                                <th
                                    className="align-middle text-center"
                                    style={{ width: '6em' }}
                                >
                                    Цена ед. изм.
                                </th>
                                <th className="align-middle text-center">Количество</th> */}
                                {/* <th
                                    className="align-middle text-center"
                                    // style={{ width: '6em' }}
                                >
                                    Цена
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {variantProps}
                            {/* <tr>
                                <th colSpan={1}>Итого</th>
                                <th className="text-center">
                                    {formatNumberWithSpaces(getVariantPriceByProps)} ₽
                                </th>
                            </tr> */}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
};

export default Variant;
