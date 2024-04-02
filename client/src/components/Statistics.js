import React from 'react';

const MED_gamma_lend = ({ lendAreaInSqM }) => {
    const areaInHa = lendAreaInSqM / 10000;
    let quantity;
    if (!lendAreaInSqM || lendAreaInSqM <= 0) {
        return;
    }
    if (areaInHa * 10 < 5) {
        quantity = 5;
    } else {
        quantity = Math.ceil(areaInHa * 10);
    }
    let justification = `Площадь исследуемого участка - ${areaInHa} га.
    Согласно п. 5.2. МУ 2.6.1.2398-08 на первом этапе проводится гамма-съемка территории с целью выявления и локализации возможных радиационных аномалий.
    На втором этапе проводятся измерения мощности дозы гамма-излучения в контрольных точках. Согласно п. 5.3. МУ 2.6.1.2398-08 количество точек измерения, необходимое для участка площадью ${areaInHa} га, составляет - ${quantity} шт.
    При выявлении радиационных аномалий могут потребоваться дополнительные исследования`;
    return { quantity, justification };
};

const Statistics = () => {
    let calcResult = MED_gamma_lend({ lendAreaInSqM: 10 });

    return (
        <div>
            Statistics
            <p>{calcResult?.quantity}</p>
            {/* <p>{MED_gamma_lend({ lendAreaInSqM: 10000 })?.justification}</p> */}
            <div
                className="form-control mb-3"
                style={{ background: '#E9ECEF' }}
                dangerouslySetInnerHTML={{
                    __html: calcResult?.justification?.replace(/\n/g, '<br>') || '-',
                }}
            />
        </div>
    );
};

export default Statistics;
