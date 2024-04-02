import React, { useContext, useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';

import { AppContext } from '../components/AppContext.js';
import basketAPI from '../http/basketAPI.js';
import BasketCategoryItem from '../components/BasketCategoryItem.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const ProjectLink = observer(() => {
    const { id } = useParams();

    const { catalog } = useContext(AppContext);
    const [linkData, setLinkData] = useState({});
    const [projectCatalog, setProjectCatalog] = useState('');
    const [linkRole, setLinkRole] = useState('');
    const [fetching, setFetching] = useState(true);

    console.log(id);

    useEffect(() => {
        basketAPI
            .fetchLink(id)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error(`Project link fetching error: ${error}`);
            })
            .then((data) => {
                setLinkRole(data.linkRole);
                setLinkData(data.projectData);
                setProjectCatalog(catalog.getCatalogByProjectLinkData(data.projectData));
                setFetching(false);
            });
    }, []);

    if (fetching) return null;

    console.log(linkRole);

    const getProjectParams = () => {
        return (
            <ul>
                <li className="mb-1">
                    Количество видов исследований и работ, включённое в состав изысканий –{' '}
                    <b>{linkData.basketVariants.length}</b>
                </li>
                <li className="mb-1">
                    Регион расположения участка изысканий –{' '}
                    <b>{catalog.getRegionNameById(linkData.regionId)}</b>
                </li>
                <li className="mb-1">
                    Тип объекта, планируемый к строительству на участке изысканий –{' '}
                    <b>
                        {linkData.isObjectTypeLine === null
                            ? 'не выбран'
                            : linkData.isObjectTypeLine
                            ? 'линейный'
                            : 'нелинейный'}
                    </b>
                </li>

                {linkData.isObjectTypeLine === true && (
                    <>
                        <li className="mb-1">
                            Протяженность трассы изысканий –{' '}
                            <b>{+linkData.trackLengthInM / 1000} км</b>
                        </li>
                        <li className="mb-1">
                            Ширина трассы изысканий – <b>{+linkData.trackWidthInM} м</b>
                        </li>
                        <li className="mb-1">
                            Площадь трассы изысканий –{' '}
                            <b>{+linkData.lendAreaInSqM / 10000} га</b>
                        </li>
                    </>
                )}
                {linkData.isObjectTypeLine === false && (
                    <li className="mb-1">
                        Площадь участка изысканий –{' '}
                        <b>{+linkData.lendAreaInSqM / 10000} га</b>
                    </li>
                )}
            </ul>
        );
    };

    const categoryList = projectCatalog.map((category) => {
        return (
            <BasketCategoryItem
                key={category.id + 'category'}
                name={category.name}
                subcategories={category.subcategories}
                linkRole={linkRole}
            />
        );
    });

    return (
        <Container fluid>
            <Row>
                <Col lg={7}>
                    <h1>
                        Проект изысканий <span className="text-danger">*</span>
                    </h1>
                </Col>

                <Col lg={5}>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link
                            className="btn btn-outline-primary w-100 m-1"
                            to="/constructor"
                        >
                            Рассчитать свой проект изысканий
                        </Link>
                    </div>
                </Col>
            </Row>
            <p>
                <em>
                    <span className="text-danger">*</span> Вы открыли ссылку на проект
                    изысканий. На основании представленного перечня исследований и работ
                    вы можете рассчитать свой проект изысканий, состав которого вы сможете
                    редактировать. Также вы сможете определить ориентировочную стоимость
                    проекта.
                </em>
            </p>
            {getProjectParams()}
            <h2 className="mb-0">Состав инженерно-экологических изысканий (ИЭИ)</h2>

            <Table bordered size="sm" className="mb-3 mt-2">
                <tbody>{categoryList}</tbody>
            </Table>
        </Container>
    );
});

export default ProjectLink;
