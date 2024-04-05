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

    const ButtonClassName = 'mb-2 w-100 text-start';
    const ButtonFontSize = '1.1em';
    const ButtonVariant = 'outline-primary';

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

            <div className="pt-2">
                {/* <p className="fs-4 lead">
                    <strong>Панель инструментов</strong>
                </p> */}

                {/* <div></div> */}
                {/* <p className="mt-3 mb-0 small text-muted">Для заказчика</p> */}

                {/* <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                    Сформировать запрос на коммерческое предложение
                </Button> */}
                <Button
                    style={{ fontSize: '1.2em' }}
                    className="mb-3 w-100 text-start"
                    // size="lg"
                >
                    Запросить КП
                </Button>
                {/* <Button variant="outline-primary" className="mb-2 mt-2 w-100">
                    Сформировать ссылку на запрос КП
                </Button> */}
                <Button
                    style={{ fontSize: ButtonFontSize }}
                    onClick={showTechnicalTaskEditor}
                    className={ButtonClassName}
                    variant={ButtonVariant}
                >
                    Сформировать задание
                </Button>
                <Button
                    style={{ fontSize: ButtonFontSize }}
                    onClick={showProgramEditor}
                    className={ButtonClassName}
                    variant={ButtonVariant}
                >
                    Сформировать программу
                </Button>
                {/* <Button variant="outline-secondary" className={ButtonClassName}>
                    Разместить запрос КП на тендере
                </Button> */}
                <Button
                    style={{ fontSize: ButtonFontSize }}
                    className={ButtonClassName}
                    onClick={getSurveyCalculationLink}
                    variant={ButtonVariant}
                >
                    Получить ссылку на проект
                </Button>
                {/* <ExampleDOCX /> */}
                {/* <Button variant="outline-primary" className={ButtonClassName}>
                    Скачать задание на изыскания
                </Button> */}
                {/* </div>
            <div> */}
                {/* <p className="mt-3 mb-0 small text-muted">Для подрядчика</p> */}

                <Button
                    style={{ fontSize: ButtonFontSize }}
                    className={ButtonClassName}
                    variant={ButtonVariant}
                >
                    Сформировать КП
                </Button>
                {/* <Button
                    style={{ fontSize: ButtonFontSize }}
                    className={ButtonClassName}
                    variant={ButtonVariant}
                >
                    Получить КП
                </Button> */}

                {/* <Button variant="outline-secondary" className={ButtonClassName}>
                    Скачать программу изысканий
                </Button> */}

                <Button
                    style={{ fontSize: ButtonFontSize }}
                    className={ButtonClassName}
                    variant={ButtonVariant}
                >
                    Сформировать таблицы
                </Button>
            </div>
        </>
    );
};

export default ProjectTools;
