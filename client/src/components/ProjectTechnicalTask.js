import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row, Table, Col } from 'react-bootstrap';

import { AppContext } from './AppContext';
import {
    DocumentName,
    H1,
    NotOdH1,
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
    DocName,
} from './PrintDocumentsStyles';

const ProjectTechnicalTask = observer(() => {
    const { catalog } = useContext(AppContext);

    const getListLevelNum = (() => {
        const num = {
            lev1: 0,
            lev2: 0,
            lev3: 0,
            lev4: 0,
            lev5: 0,
        };

        return (listLevel) => {
            let result;
            if (listLevel === 1) {
                num.lev1 += 1;
                num.lev2 = num.lev3 = num.lev4 = num.lev5 = 0;
                result = num.lev1;
            } else if (listLevel === 2) {
                num.lev2 += 1;
                num.lev3 = num.lev4 = num.lev5 = 0;
                result = num.lev1 + '.' + num.lev2;
            } else if (listLevel === 3) {
                num.lev3 += 1;
                num.lev4 = num.lev5 = 0;
                result = num.lev1 + '.' + num.lev2 + '.' + num.lev3;
            } else if (listLevel === 4) {
                num.lev4 += 1;
                num.lev5 = 0;
                result = num.lev1 + '.' + num.lev2 + '.' + num.lev3 + '.' + num.lev4;
            } else if (listLevel === 5) {
                num.lev5 += 1;
                result =
                    num.lev1 +
                    '.' +
                    num.lev2 +
                    '.' +
                    num.lev3 +
                    '.' +
                    num.lev4 +
                    '.' +
                    num.lev5;
            }

            return result;
        };
    })();

    const getHNum = (listLevel) => {
        const num = getListLevelNum(listLevel);
        return <HNum>{num}</HNum>;
    };

    // const getText = (text) => {
    //     if (text) {
    //         const paragraphs = text.split('\n');
    //         return paragraphs.map((paragraph, index) => (
    //             <p key={index} className="mb-1 p-0">
    //                 {paragraph}
    //             </p> // Создаем абзац для каждой строки текста
    //         ));
    //     } else {
    //         return <p className="mb-1 p-0">Поле не заполнено</p>;
    //     }
    // };

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

    // const getPlannedSurveysTable = (data, tableName) => {
    //     let curCategoryNumber = 0;
    //     let curSubcategoryNumber = 0;
    //     let curSurveyNumber = 0;
    //     const rows = [];

    //     data.forEach((category) => {
    //         curCategoryNumber += 1;
    //         curSubcategoryNumber = 0;

    //         rows.push(
    //             <tr
    //                 className="table-secondary"
    //                 key={category.id + 'Category' + 'SurveysTable' + tableName}
    //             >
    //                 <td>{curCategoryNumber}</td>
    //                 <td colSpan={tableName === 'surveys' ? 5 : 3}>
    //                     <p className="m-0">{category.name}</p>
    //                 </td>
    //             </tr>
    //         );
    //         category.subcategories.forEach((subcategory) => {
    //             curSubcategoryNumber += 1;
    //             curSurveyNumber = 0;

    //             rows.push(
    //                 <React.Fragment
    //                     key={subcategory.id + 'subcategory' + 'SurveysTable' + tableName}
    //                 >
    //                     <tr className="table-light">
    //                         <td>{curCategoryNumber + '.' + curSubcategoryNumber}</td>
    //                         <td colSpan={4}>
    //                             <p className="m-0">{subcategory.name}</p>
    //                         </td>
    //                     </tr>
    //                     <tr
    //                         key={
    //                             category.id +
    //                             'Subcategory' +
    //                             'SurveysTable' +
    //                             'headers' +
    //                             tableName
    //                         }
    //                     >
    //                         <td className="small align-middle text-center text-muted"></td>
    //                         <td className="small align-middle text-center text-muted">
    //                             Вид исследования
    //                         </td>

    //                         {tableName === 'surveys' && (
    //                             <td className="small align-middle text-center text-muted">
    //                                 Единица измерения
    //                             </td>
    //                         )}

    //                         {tableName === 'surveys' && (
    //                             <td
    //                                 className=" small align-middle text-center text-muted"
    //                                 style={{ width: '4em' }}
    //                             >
    //                                 Кол-во
    //                             </td>
    //                         )}

    //                         {tableName === 'surveys' && (
    //                             <td className=" small align-middle text-center text-muted">
    //                                 Дополнительные параметры единицы измерения
    //                             </td>
    //                         )}

    //                         {tableName === 'justification' && (
    //                             <td className=" small align-middle text-center text-muted">
    //                                 Обоснование принятого объёма работ
    //                             </td>
    //                         )}
    //                     </tr>
    //                 </React.Fragment>
    //             );
    //             subcategory.surveys.forEach((survey) => {
    //                 curSurveyNumber += 1;
    //                 rows.push(
    //                     <tr key={survey.id + 'Survey' + 'SurveysTable' + tableName}>
    //                         <td>
    //                             {curCategoryNumber +
    //                                 '.' +
    //                                 curSubcategoryNumber +
    //                                 '.' +
    //                                 curSurveyNumber}
    //                         </td>
    //                         <td>{survey.name}</td>

    //                         {tableName === 'surveys' && (
    //                             <td className="text-center">{survey.variants[0].unit}</td>
    //                         )}

    //                         {tableName === 'surveys' && (
    //                             <td className="text-center">
    //                                 {survey.variants[0].quantity}
    //                             </td>
    //                         )}

    //                         {tableName === 'surveys' && (
    //                             <td
    //                                 style={{ minWidth: '20em' }}
    //                                 dangerouslySetInnerHTML={{
    //                                     __html:
    //                                         survey.variants[0].properties?.replace(
    //                                             /\n/g,
    //                                             '<br>'
    //                                         ) || '-',
    //                                 }}
    //                             />
    //                         )}

    //                         {tableName === 'justification' && (
    //                             <td
    //                                 style={{ maxWidth: '100em' }}
    //                                 // style={{ minWidth: '30em' }}
    //                                 dangerouslySetInnerHTML={{
    //                                     __html:
    //                                         survey.variants[0].justification?.replace(
    //                                             /\n/g,
    //                                             '<br>'
    //                                         ) || '-',
    //                                 }}
    //                             />
    //                         )}
    //                     </tr>
    //                 );
    //             });
    //         });
    //     });

    //     return (
    //         <Table bordered size="sm" className="m-0">
    //             <tbody>{rows}</tbody>
    //         </Table>
    //     );
    // };

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
                    {getHNum(1)}
                    {category.name}
                </H3>
            );
            category.subcategories.forEach((subcategory) => {
                curSubcategoryNumber += 1;
                curSurveyNumber = 0;

                rows.push(
                    <H4 key={subcategory.id + 'Subcategory' + 'JustificationText'}>
                        {getHNum(2)}
                        {subcategory.name}
                    </H4>
                );
                subcategory.surveys.forEach((survey, ind1) => {
                    curSurveyNumber += 1;

                    rows.push(
                        <React.Fragment key={survey.id + 'Survey' + 'JustificationText'}>
                            <H5>
                                {getHNum(3)}
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
                    Утверждено:
                </Col>
                <Col></Col>
                <Col xs={5} style={{ fontWeight: 500 }}>
                    Согласовано:
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

            <NotOdH1>
                ЗАДАНИЕ
                <br />
                на выполнение инженерно-экологических изысканий
            </NotOdH1>
            {getTechnicalTaskTable(catalog.technicalTaskData)}
            <br />

            <hr className="bg-primary mt-5 mb-5" />

            <NotOdH1>
                Приложение 1
                <br />
                Ситуационный план с обозначением участка изысканий
            </NotOdH1>

            <hr className="bg-primary mt-5 mb-5" />

            <NotOdH1>
                Приложение 2
                <br />
                Предлагаемый перечень исследований и работ
            </NotOdH1>

            {getPlannedSurveysTable(catalog.projectCatalog, 'surveys')}

            {/* <TableName>
                Табл. 2 - Обоснование предлагаемого перечня исследований
            </TableName> */}
            {/* {getPlannedSurveysTable(catalog.projectCatalog, 'justification')} */}

            <hr className="bg-primary mt-5 mb-5" />

            <NotOdH1>
                Приложение 3
                <br />
                Обоснование предлагаемого перечня исследований и работ
            </NotOdH1>

            {getJustificationText(catalog.projectCatalog)}
        </div>
    );
});

export default ProjectTechnicalTask;
