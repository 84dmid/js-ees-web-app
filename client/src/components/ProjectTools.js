import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import basketAPI from '../http/basketAPI';

import ProjectTechnicalTaskModalEditor from './ProjectTechnicalTaskModalEditor';
import ProjectProgramModalEditor from './ProjectProgramModalEditor';
import CreatingLinkModal from './CreatingLinkModal';
import ExampleDOCX from './ExampleDOCX';

const ProjectTools = () => {
    const [isShowingTechnicalTaskEditor, setIsShowingTechnicalTaskEditor] =
        useState(false);
    const [isShowingProgramEditor, setIsShowingProgramEditor] = useState(false);
    const [isShowingCreatingLinkModal, setIsShowingCreatingLinkModal] = useState(false);
    const [link, setLink] = useState('');

    const showTechnicalTaskEditor = () => {
        setIsShowingTechnicalTaskEditor(true);
    };
    const showProgramEditor = () => {
        setIsShowingProgramEditor(true);
    };

    const getSurveyCalculationLink = async () => {
        const link = await basketAPI.createLink({ linkRole: 'calculation' });
        const baseClientURL = process.env.REACT_APP_CLIENT_URL;
        const surveyCalculationLink = baseClientURL + 'project_link/' + link.id;
        setLink(surveyCalculationLink);
        setIsShowingCreatingLinkModal(true);
    };

    return (
        <>
            {isShowingCreatingLinkModal && (
                <CreatingLinkModal
                    show={isShowingCreatingLinkModal}
                    setShow={setIsShowingCreatingLinkModal}
                    link={link}
                />
            )}
            {isShowingTechnicalTaskEditor && (
                <ProjectTechnicalTaskModalEditor
                    show={isShowingTechnicalTaskEditor}
                    setShow={setIsShowingTechnicalTaskEditor}
                />
            )}
            {isShowingProgramEditor && (
                <ProjectProgramModalEditor
                    show={isShowingProgramEditor}
                    setShow={setIsShowingProgramEditor}
                />
            )}

            <div>
                {/* <p className="fs-4 lead">
                    <strong>Панель инструментов</strong>
                </p> */}

                {/* <div></div> */}
                <p className="mt-3 mb-0 small text-muted">Для заказчика</p>

                {/* <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                    Сформировать запрос на коммерческое предложение
                </Button> */}
                <Button variant="outline-danger" className="mb-2 mt-3 w-100">
                    Запросить коммерческое предложение (КП)
                </Button>
                <Button variant="outline-primary" className="mb-2 mt-2 w-100">
                    Сформировать ссылку на запрос КП
                </Button>
                <Button
                    onClick={showTechnicalTaskEditor}
                    variant="outline-primary"
                    className="mb-2 mt-2 w-100"
                >
                    Сформировать задание на изыскания
                </Button>
                {/* <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                    Разместить запрос КП на тендере
                </Button> */}
                <Button
                    variant="outline-primary"
                    className="mb-2 mt-2 w-100"
                    onClick={getSurveyCalculationLink}
                >
                    Получить ссылку на проект
                </Button>
                {/* <ExampleDOCX /> */}
                {/* <Button variant="outline-primary" className="mb-2 mt-2 w-100">
                    Скачать задание на изыскания
                </Button> */}
            </div>
            <div>
                <p className="mt-3 mb-0 small text-muted">Для подрядчика</p>

                <Button variant="outline-primary" className="mb-2 mt-2 w-100">
                    Сформировать КП
                </Button>
                <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                    Получить КП
                </Button>
                <Button
                    onClick={showProgramEditor}
                    variant="outline-secondary"
                    className="mb-2 mt-2 w-100"
                >
                    Сформировать программу изысканий
                </Button>
                <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                    Скачать программу изысканий
                </Button>

                <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                    Сформировать таблицы для тома ИЭИ
                </Button>
            </div>
        </>
    );
};

export default ProjectTools;
