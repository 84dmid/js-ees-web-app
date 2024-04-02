import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row, Table, Col } from 'react-bootstrap';
import { AppContext } from './AppContext';

import {
    DocumentName,
    H1,
    H2,
    H3,
    H4,
    H5,
    Appendix,
    Th,
    P,
    TableText,
    TableName,
    TNum,
    HNum,
    LiMark,
    Li,
} from './PrintDocumentsStyles';

const ProjectProgram = observer(() => {
    const { catalog } = useContext(AppContext);

    const getHNum = (() => {
        const num = {
            h1: 0,
            h2: 0,
            h3: 0,
            h4: 0,
            h5: 0,
        };

        return (hederName) => {
            let result;
            if (hederName === 'h1') {
                num.h1 += 1;
                num.h2 = num.h3 = num.h4 = num.h5 = 0;
                result = num.h1;
            } else if (hederName === 'h2') {
                num.h2 += 1;
                num.h3 = num.h4 = num.h5 = 0;
                result = num.h1 + '.' + num.h2;
            } else if (hederName === 'h3') {
                num.h3 += 1;
                num.h4 = num.h5 = 0;
                result = num.h1 + '.' + num.h2 + '.' + num.h3;
            } else if (hederName === 'h4') {
                num.h4 += 1;
                num.h5 = 0;
                result = num.h1 + '.' + num.h2 + '.' + num.h3 + '.' + num.h4;
            } else if (hederName === 'h5') {
                num.h5 += 1;
                result =
                    num.h1 + '.' + num.h2 + '.' + num.h3 + '.' + num.h4 + '.' + num.h5;
            }

            return <HNum>{result}</HNum>;
        };
    })();

    const getTNum = (() => {
        let tNum = 0;
        return () => <TNum>{'Табл. ' + (tNum += 1)}</TNum>;
    })();

    const getLiMark = () => {
        return <LiMark>–</LiMark>;
    };

    const getText = (text) => {
        if (text) {
            const paragraphs = text.split('\n');
            return paragraphs.map((paragraph, index) => (
                <TableText key={index}>{paragraph}</TableText> // Создаем абзац для каждой строки текста
            ));
        } else {
            return <TableText>Поле не заполнено</TableText>;
        }
    };

    const getTechnicalTaskTable = (data) => {
        let curNumber = 0;
        let curChildNumber = 0;
        let key = 0;
        const getKey = () => {
            key += 1;
            return key + 'printData';
        };
        const rows = data.map((row) => {
            if (row.isFather) {
                curNumber += 1;
                curChildNumber = 0;
                return (
                    <tr key={getKey()}>
                        <td>{curNumber.toString()}</td>
                        <td colSpan={2}>{row.dataName}</td>
                    </tr>
                );
            } else if (row.isChild) {
                curChildNumber += 1;
                return (
                    <tr key={getKey()}>
                        <td>{curNumber + '.' + curChildNumber}</td>
                        <td>{row.dataName}</td>
                        <td className={row.data ? '' : 'text-danger'}>
                            {getText(row.data)}
                        </td>
                    </tr>
                );
            } else {
                curNumber += 1;
                return (
                    <tr key={getKey()}>
                        <td>{curNumber.toString()}</td>
                        <td>{row.dataName}</td>
                        <td className={row.data ? '' : 'text-danger'}>
                            {getText(row.data)}
                        </td>
                    </tr>
                );
            }
        });

        return (
            <Table bordered size="sm" className="m-0">
                <tbody>{rows}</tbody>
            </Table>
        );
    };

    const getPlannedSurveysTable = (data, tableName) => {
        let curCategoryNumber = 0;
        let curSubcategoryNumber = 0;
        let curSurveyNumber = 0;
        const rows = [];

        data.forEach((category) => {
            curCategoryNumber += 1;
            curSubcategoryNumber = 0;

            rows.push(
                <tr
                    className="table-secondary"
                    key={category.id + 'Category' + 'SurveysTable' + tableName}
                >
                    <td>{curCategoryNumber}</td>
                    <td colSpan={tableName === 'surveys' ? 5 : 3}>
                        <p className="m-0">{category.name}</p>
                    </td>
                </tr>
            );
            category.subcategories.forEach((subcategory) => {
                curSubcategoryNumber += 1;
                curSurveyNumber = 0;

                rows.push(
                    <React.Fragment
                        key={subcategory.id + 'subcategory' + 'SurveysTable' + tableName}
                    >
                        <tr className="table-light">
                            <td>{curCategoryNumber + '.' + curSubcategoryNumber}</td>
                            <td colSpan={4}>
                                <p className="m-0">{subcategory.name}</p>
                            </td>
                        </tr>
                    </React.Fragment>
                );
                subcategory.surveys.forEach((survey) => {
                    curSurveyNumber += 1;
                    rows.push(
                        <tr key={survey.id + 'Survey' + 'SurveysTable' + tableName}>
                            <td>
                                {curCategoryNumber +
                                    '.' +
                                    curSubcategoryNumber +
                                    '.' +
                                    curSurveyNumber}
                            </td>
                            <td>{survey.name}</td>

                            {tableName === 'surveys' && (
                                <td className="text-center">{survey.variants[0].unit}</td>
                            )}

                            {tableName === 'surveys' && (
                                <td className="text-center">
                                    {survey.variants[0].quantity}
                                </td>
                            )}

                            {tableName === 'surveys' && (
                                <td
                                    style={{ minWidth: '20em' }}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            survey.variants[0].properties?.replace(
                                                /\n/g,
                                                '<br>'
                                            ) || '—',
                                    }}
                                />
                            )}
                        </tr>
                    );
                });
            });
        });

        return (
            <Table bordered size="sm" className="m-0">
                <thead>
                    <tr>
                        <Th className="small align-middle text-center">№</Th>
                        <Th className="small align-middle text-center">
                            Вид исследования
                        </Th>
                        <Th className="small align-middle text-center">
                            Единица измерения
                        </Th>
                        <Th
                            className=" small align-middle text-center"
                            style={{ width: '4em' }}
                        >
                            Кол-во
                        </Th>
                        <Th className=" small align-middle text-center">
                            Дополнительные параметры единицы измерения
                        </Th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: '0.9em' }}>{rows}</tbody>
            </Table>
        );
    };

    const getJustificationText = (data) => {
        let curCategoryNumber = 0;
        let curSubcategoryNumber = 0;
        let curSurveyNumber = 0;
        const rows = [];

        data.forEach((category) => {
            curCategoryNumber += 1;
            curSubcategoryNumber = 0;

            rows.push(
                <H3 key={category.id + 'Category' + 'JustificationText'}>
                    {getHNum('h3')}
                    {category.name}
                </H3>
            );
            category.subcategories.forEach((subcategory) => {
                curSubcategoryNumber += 1;
                curSurveyNumber = 0;

                rows.push(
                    <H4 key={subcategory.id + 'Subcategory' + 'JustificationText'}>
                        {getHNum('h4')}
                        {subcategory.name}
                    </H4>
                );
                subcategory.surveys.forEach((survey, ind1) => {
                    curSurveyNumber += 1;

                    rows.push(
                        <React.Fragment key={survey.id + 'Survey' + 'JustificationText'}>
                            <H5>
                                {getHNum('h5')}
                                {survey.name}
                            </H5>
                            {survey.variants[0].justification
                                ?.split('\n')
                                .map((str, ind2) => {
                                    const key =
                                        survey.id +
                                        'Survey' +
                                        'JustificationText' +
                                        ind1 +
                                        '.' +
                                        ind2;
                                    str = str.trim();
                                    if (str[0] === '-') {
                                        {
                                            return (
                                                <Li key={key}>
                                                    {getLiMark()}
                                                    {str.slice(2)}
                                                </Li>
                                            );
                                        }
                                    } else {
                                        return <P key={key}>{str || '—'}</P>;
                                    }
                                })}
                        </React.Fragment>
                    );
                });
            });
        });

        return rows;
    };

    const getCustomerSNP = () => {
        const {
            customerSignatorySurname,
            customerSignatoryName,
            customerSignatoryPatronymic,
        } = catalog.customerData;

        if (!customerSignatorySurname || !customerSignatoryName) return null;

        const surname =
            customerSignatorySurname.charAt(0).toUpperCase() +
            customerSignatorySurname.slice(1);
        const firstNameChar = customerSignatoryName.charAt(0).toUpperCase() + '.';
        const firstPatronymicChar = customerSignatoryPatronymic
            ? ' ' + customerSignatoryPatronymic.charAt(0).toUpperCase() + '.'
            : '';
        return surname + ' ' + firstNameChar + firstPatronymicChar;
    };

    const getContractorSNP = () => {
        const {
            contractorSignatorySurname,
            contractorSignatoryName,
            contractorSignatoryPatronymic,
        } = catalog.contractorData;

        if (!contractorSignatorySurname || !contractorSignatoryName) return null;

        const surname =
            contractorSignatorySurname.charAt(0).toUpperCase() +
            contractorSignatorySurname.slice(1);
        const firstNameChar = contractorSignatoryName.charAt(0).toUpperCase() + '.';
        const firstPatronymicChar = contractorSignatoryPatronymic
            ? ' ' + contractorSignatoryPatronymic.charAt(0).toUpperCase() + '.'
            : '';
        return surname + ' ' + firstNameChar + firstPatronymicChar;
    };

    return (
        <div className="bg-white">
            <Row>
                <Col xs={5} style={{ fontWeight: 500 }}>
                    Согласовано:
                </Col>
                <Col></Col>
                <Col xs={5} style={{ fontWeight: 500 }}>
                    Утверждено:
                </Col>
            </Row>
            <Row>
                <Col xs={5}>
                    {catalog.contractorData.contractorSignatoryPosition || (
                        <span className="text-danger">Должность подписанта</span>
                    )}
                </Col>
                <Col></Col>
                <Col xs={5}>
                    {catalog.customerData.customerSignatoryPosition || (
                        <span className="text-danger">Должность подписанта</span>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={5}>
                    {catalog.contractorData.contractorCompanyName || (
                        <span className="text-danger">Наименование организации</span>
                    )}
                </Col>
                <Col></Col>
                <Col xs={5}>
                    {catalog.customerData.customerCompanyName || (
                        <span className="text-danger">Наименование организации</span>
                    )}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={5}>
                    {getContractorSNP() || (
                        <span className="text-danger">Фамилия И. О. подписанта</span>
                    )}
                </Col>
                <Col></Col>
                <Col xs={5}>
                    {getCustomerSNP() || (
                        <span className="text-danger">Фамилия И. О. подписанта</span>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={5}>
                    «____» _______________ {catalog.customerData.customerSigningDate} г.
                </Col>
                <Col></Col>
                <Col xs={5}>
                    «____» _______________ {catalog.contractorData.contractorSigningDate}{' '}
                    г.
                </Col>
            </Row>
            <Row className="mb-5">
                <Col xs={5}>
                    <small>М.П.</small>
                </Col>
                <Col></Col>
                <Col xs={5}>
                    <small>М.П.</small>
                </Col>
            </Row>
            <DocumentName>
                ПРОГРАММА
                <br />
                на выполнение инженерно-экологических изысканий
            </DocumentName>
            <H1>{getHNum('h1')}Общие сведения</H1>
            <TableName>{getTNum()}Общие сведения</TableName>
            {getTechnicalTaskTable(catalog.programData)}
            <H1>{getHNum('h1')} Изученность территории</H1>
            <H2>
                {getHNum('h2')}
                Сведения о ранее выполненных инженерных изысканиях на рассматриваемом
                участке
            </H2>
            <P className="text-danger">Данные отсутствуют</P>
            <H2>
                {getHNum('h2')}Сведения о планируемых к использованию материалах и данных
            </H2>
            <P>
                Сведения о материалах и данных планируемых к использованию представлены
                ниже в таблицах.
            </P>
            <TableName>
                {getTNum()}Сведения материалах и данных, дополнительно получаемых
                (приобретаемых) заказчиком или по его поручению исполнителем
            </TableName>
            <Table size="sm" bordered>
                <thead>
                    <tr className="small text-center">
                        <Th>№</Th>
                        <Th>Источник данных (уполномоченный орган, организация)</Th>
                        <Th>Перечень данных</Th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td className="text-danger">Данные отсутствуют</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
            <TableName>{getTNum()}Перечень архивных материалов и данных</TableName>
            <Table size="sm" bordered>
                <thead>
                    <tr className="small text-center">
                        <Th>№</Th>
                        <Th>Источник данных (уполномоченный орган, организация)</Th>
                        <Th>Перечень данных</Th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td className="text-danger">Данные отсутствуют</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
            <H1>{getHNum('h1')}Краткая характеристика района работ</H1>
            <H2>
                {getHNum('h2')}Краткая физико-географическая характеристика района работ
            </H2>
            <H3>{getHNum('h3')}Геоморфология и рельеф</H3>
            <H3>{getHNum('h3')}Гидрография</H3>
            <H3>{getHNum('h3')}Климатические условия</H3>
            <H2>
                {getHNum('h2')}Краткая природно-хозяйственная характеристика территории по
                имеющимся материалам о состоянии окружающей среды
            </H2>
            <H1>{getHNum('h1')}Состав и виды работ, организация их выполнения</H1>
            <H2>{getHNum('h2')}Последовательность выполнения работ</H2>
            <Li>{getLiMark()}Согласование объёма и стоимости работ с заказчиком.</Li>
            <Li>{getLiMark()}Составление программы инженерно-экологических изысканий.</Li>
            <Li>
                {getLiMark()}Поиск архивных материалов в базе данных исполнителя и анализ
                данных, представленных заказчиком (при их наличии).
            </Li>
            <Li>
                {getLiMark()}Анализа данных публичной кадастровой карты и др. открытых
                картографических материалов на наличие зон экологических ограничений.
            </Li>
            <Li>
                {getLiMark()}Составление и отправка запросов на получение фондовых
                материалов.
            </Li>
            <Li>
                {getLiMark()}Составление и отправка запросов в лаборатории для определения
                оптимальной стоимости и сроков выполнения лабораторных работ.
            </Li>
            <Li>{getLiMark()}Проведение полевых работ.</Li>
            <Li>{getLiMark()}Проведение лабораторных работ.</Li>
            <Li>
                {getLiMark()}Камеральная обработка фондовых материалов и результатов
                лабораторных исследований.
            </Li>
            <Li>{getLiMark()}Составление технического отчёта.</Li>
            <H2>{getHNum('h2')}Виды и объёмы запланированных работ</H2>
            <TableName>{getTNum()}Виды и объёмы запланированных работ</TableName>
            {getPlannedSurveysTable(catalog.projectCatalog, 'surveys')}
            <H2>{getHNum('h2')}Обоснование состава и объёмов работ</H2>
            {getJustificationText(catalog.projectCatalog)}
            <H2>
                {getHNum('h2')}Обоснование методов и технологий выполнения лабораторных
                работ
            </H2>
            <P>
                Методы и технологии выполнения лабораторных работ определяются
                организацией, проводящей измерения, отбор и исследование проб в
                соответствии с областью аккредитации организации.
            </P>

            <H2>
                {getHNum('h2')}Мероприятия по соблюдению требований к точности и
                обеспеченности данных и характеристик, получаемых по результатам
                инженерных изысканий, сведения о метрологической поверке (калибровке),
                аттестации средств измерений (перечень применяемых средств измерений,
                подлежащих поверке)
            </H2>
            <P>Организацией, проводящей измерения, отбор, исследование проб:</P>
            <Li>
                {getLiMark()}определяются применяемые в лабораторных исследованиях
                приборы, оборудование, инструменты, программные продукты;
            </Li>
            <Li>
                {getLiMark()}проводится метрологическая поверка (калибровка) средств
                измерений и/или аттестация испытательного оборудования;
            </Li>
            <Li>
                {getLiMark()}определяются мероприятия по соблюдению требований к точности
                результатов лабораторных исследований.
            </Li>
            <H1>{getHNum('h1')}Контроль качества и приемка работ</H1>
            <P>
                На всех этапах выполнения инженерных изысканий предусмотрен внутренний
                контроль качества. Окончательную приемку работ производит представитель
                заказчика, с подписанием акта приемки выполненных работ, при наличии
                такого условия в договоре.
            </P>
            <H1>{getHNum('h1')}Используемые нормативные документы</H1>
            <Li>
                {getLiMark()}СП 47.13330.2016 Инженерные изыскания для строительства.
                Основные положения.
            </Li>
            <H1>{getHNum('h1')}Перечень отчетных материалов</H1>
            <H2>
                {getHNum('h2')}Перечень и состав отчетных материалов, сроки, форма и
                порядок их представления заказчику
            </H2>
            <P>
                Сроки, форма и порядок представления отчётных материалов заказчику
                определяются договором.
            </P>
            {/* <P>
                Наименование объекта:
                {catalog.generalData.objectName || (
                    <span className="text-danger"> поле не заполнено</span>
                )}
            </P> */}
            <P>
                Наименование отчёта:{' '}
                {catalog.generalData.volumeName || (
                    <span className="text-danger">поле не заполнено</span>
                )}
                .
            </P>
            <P>
                Шифр тома:{' '}
                {catalog.generalData.volumeCode || (
                    <span className="text-danger">поле не заполнено</span>
                )}
            </P>
            <P>Номер тома: {catalog.generalData.volumeNumber || 'без номера.'}</P>

            <H2>
                {getHNum('h2')}Количество экземпляров технических отчетов на бумажных и
                электронных носителях
            </H2>
            <P>На бумажном носителе – определяется договором.</P>
            <P>На электронном носителе – определяется договором.</P>

            <H2>
                {getHNum('h2')}Форматы текстовых и графических документов в электронном
                виде
            </H2>

            <P>
                В соответствии с требованиями Приказа Минстроя от 12 мая 2017 г. № 783/пр
                "Об утверждении требований к формату электронных документов,
                представляемых для проведения государственной экспертизы проектной
                документации и (или) результатов инженерных изысканий и проверки
                достоверности определения сметной стоимости строительства, реконструкции,
                капитального ремонта объектов капитального строительства":
            </P>
            <Li>{getLiMark()}графическая часть в формате – pdf;</Li>
            <Li>{getLiMark()}текстовая часть в формате – pdf.</Li>

            <hr className="bg-primary mt-5 mb-5" />

            <Appendix>
                Приложение 1
                <br />
                Ситуационный план с обозначением участка изысканий
            </Appendix>

            {/* {getTechnicalTaskTable(catalog.printData)}
            <br />

            <hr className="bg-primary" /> */}
            {/* <p className="Lead fw-bold text-center mt-4 mb-1">
                Приложение 1
                <br />
                Предлагаемый состав изысканий
            </p> */}
            {/* <p className="Lead fw-bold mb-1 mt-2">
                Табл. 1 - Предлагаемый перечень исследований
            </p>

            <p className="Lead fw-bold mb-1 mt-3">
                Табл. 2 - Обоснование предлагаемого перечня исследований
            </p>
            {getPlannedSurveysTable(catalog.projectCatalog, 'justification')} */}
        </div>
    );
});

export default ProjectProgram;
