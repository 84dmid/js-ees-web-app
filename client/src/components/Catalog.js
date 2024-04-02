import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AppContext } from './AppContext.js';
import CategoryItem from './CategoryItem.js';
import basketAPI from '../http/basketAPI.js';

const Catalog = observer(() => {
    const { catalog, EESCalculator } = useContext(AppContext);

    // const clearBasket = () => {
    //     basketAPI
    //         .clear()
    //         .catch((error) => console.error(`Clearing basket error: ${error}`))
    //         .then((data) => {
    //             EESCalculator.params = catalog.projectParams = data;
    //             EESCalculator.regionId = catalog.regionId = data.regionId;
    //             catalog.projectVariants = data.basketVariants;
    //         });
    // };

    const categoryList = catalog.catalog.map((category) => {
        return (
            <CategoryItem
                key={category.id + 'category'}
                name={category.name}
                subcategories={category.subcategories}
            />
        );
    });

    if (!categoryList.length) {
        return (
            <>
                <h1>Конструктор состава изысканий</h1>

                <p className="lead">Как пользоваться конструктором</p>
                <p>
                    Для включения конструктора необходимо произвести расчёт состава
                    изысканий. Для этого, в панели авторасчёта выберите регион
                    расположения участка изысканий и тип объекта, планируемого к
                    строительству. После этого, в зависимости и от типа объекта, появятся
                    поля для ввода характеристик участка и варианты сценариев
                    использования участка. Поля обязательны для заполнения, варианты
                    использования участка можно выбрать позже. Затем нажмите кнопку
                    'Рассчитать состав изысканий'.
                </p>
                <p>
                    После расчёта появится каталог с видами исследований и вариантами
                    определения объёма работ по каждому исследованию. Чтобы автоматически
                    определить необходимый вам набор исследований, вы можете выбрать один
                    из сценариев использования участка и повторно нажать кнопку
                    'Рассчитать состав изысканий'. Также вы можете самостоятельно выбрать
                    нужные вам исследования.
                </p>

                <p>
                    Результаты расчёта можно будет посмотреть на вкладке{' '}
                    <Link>Проект изысканий</Link>. Также на данной вкладке находятся
                    инструменты для формирования технических заданий и программ изысканий,
                    коммерческих предложений и запросов на коммерческие предложения на
                    выполнение изысканий. Перечисленные документы формируются на основании
                    расчёта.
                </p>
                <p>Настоящий текст исчезнет после проведения расчёта, удачи!!!</p>
            </>
        );
    }

    return (
        <>
            {/* <Row>
                <Col sm={7}>
                    <h1>Конструктор состава изысканий</h1>
                </Col>
                <Col sm={5}>
                    <Button
                        onClick={clearBasket}
                        variant="outline-primary"
                        className="w-100"
                        >
                        Сбросить параметры расчёта и очистить проект
                    </Button>
                </Col>
            </Row> */}
            <h1>Конструктор состава изысканий</h1>
            <p className="mt-0 mb-0">
                <small>
                    <span className="text-danger">*</span> Указаны средние цены по России,
                    чтобы узнать точную стоимость необходимо запросить коммерческое
                    предложение. Запросить КП можно либо у{' '}
                    <Link to="/contractors">подрядчиков</Link>, представленных на сайте,
                    либо получить ссылку на запрос и направить её в любую известную вам
                    организацию. Подробнее на вкладке{' '}
                    <Link to="/project">проект изысканий</Link>.
                </small>
            </p>

            <h2>Каталог видов исследований и вариантов определения объёмов работ</h2>
            <p className="mt-0 mb-1"></p>
            <Table size="sm" className="mb-0">
                <tbody>{categoryList}</tbody>
            </Table>
        </>
    );
});

export default Catalog;
