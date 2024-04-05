import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../AppContext';

const CalculationInfoShortList = observer(() => {
    const { catalog } = useContext(AppContext);

    function formatNumberWithSpaces(number) {
        return number.toLocaleString('ru-RU', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }

    return (
        <>
            <ul>
                <li className="mb-1">
                    Ориентировочная стоимость –{' '}
                    <b>{formatNumberWithSpaces(catalog.projectPrice)} ₽</b>.
                </li>
                <li className="mb-1">
                    Количество видов работ – <b>{catalog.projectSurveyCount} шт</b>.
                </li>
                <li className="mb-1">
                    Тип объекта строительства –{' '}
                    <b>
                        {catalog.calcData.isObjectTypeLine === null
                            ? 'не выбран'
                            : catalog.calcData.isObjectTypeLine
                            ? 'линейный'
                            : 'нелинейный'}
                    </b>
                    .
                </li>

                {catalog.calcData.isObjectTypeLine === true && (
                    <>
                        <li className="mb-1">
                            Протяженность трассы изысканий –{' '}
                            <b>{+catalog.calcData.trackLengthInM / 1000} км</b>.
                        </li>
                        <li className="mb-1">
                            Ширина трассы изысканий –{' '}
                            <b>{+catalog.calcData.trackWidthInM} м</b>.
                        </li>
                        <li className="mb-1">
                            Площадь трассы изысканий –{' '}
                            <b>
                                {(catalog.calcData.trackLengthInM *
                                    catalog.calcData.trackWidthInM) /
                                    10000}{' '}
                                га
                            </b>
                            .
                        </li>
                    </>
                )}

                {catalog.calcData.isObjectTypeLine === false && (
                    <>
                        <li className="mb-1">
                            Площадь участка изысканий –{' '}
                            <b>{+catalog.calcData.plotAreaInSqM / 10000} га</b>.
                        </li>
                    </>
                )}

                <li className="mb-1">
                    Регион – <b>{catalog.regionName}</b>.
                </li>
            </ul>
        </>
    );
});

export default CalculationInfoShortList;
