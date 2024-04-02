import React, { useContext } from 'react';
import { saveAs } from 'file-saver';
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    VerticalAlign,
    TextDirection,
    UnderlineType,
    convertInchesToTwip,
    LevelFormat,
    Footer,
    PageNumber,
} from 'docx';
import { observer } from 'mobx-react-lite';
import { AppContext } from './AppContext';
import { Button } from 'react-bootstrap';

const ExampleDOCX = () => {
    const { catalog } = useContext(AppContext);

    const styles = {
        default: {
            heading1: {
                run: {
                    size: 28,
                    bold: true,
                    italics: true,
                    color: 'FF0000',
                },
                paragraph: {
                    spacing: {
                        after: 120,
                    },
                },
            },
            heading2: {
                run: {
                    size: 26,
                    bold: true,
                    underline: {
                        type: UnderlineType.DOUBLE,
                        color: 'FF0000',
                    },
                },
                paragraph: {
                    spacing: {
                        before: 240,
                        after: 120,
                    },
                },
            },
            listParagraph: {
                run: {
                    color: '#FF0000',
                },
            },
            document: {
                run: {
                    size: '12pt',
                    font: 'Arial',
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: { start: 50, end: 50 },
                    spacing: {
                        before: 50,
                        after: 50,
                    },
                },
            },
        },
    };

    const footers = {
        default: new Footer({
            children: [
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            children: ['стр. ', PageNumber.CURRENT],
                        }),
                        new TextRun({
                            children: [' из ', PageNumber.TOTAL_PAGES],
                        }),
                    ],
                }),
            ],
        }),
    };

    const getParagraphs = (text) => {
        if (text) {
            return text.split('\n').map((str) => new Paragraph(str));
        } else {
            return [
                new Paragraph({
                    children: [new TextRun({ text: 'Заполнить', color: 'FF0000' })],
                }),
            ];
        }
    };

    const getSignatoriesData = () => {
        const borders = {
            left: {
                size: 3, // глюк, делает границы прозрачными
            },
            right: {
                size: 3,
            },
            bottom: {
                size: 3,
            },
            top: {
                size: 3,
            },
        };

        return new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },

            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            borders,
                            width: {
                                size: 43,
                                type: WidthType.PERCENTAGE,
                            },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: 'Согласовано:', bold: true }),
                                    ],
                                }),
                            ],
                        }),
                        new TableCell({
                            borders,
                            children: [new Paragraph('')],
                        }),
                        new TableCell({
                            borders,
                            width: {
                                size: 43,
                                type: WidthType.PERCENTAGE,
                            },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: 'Утверждено:', bold: true }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [new TextRun({ text: 'Директор' })],
                                }),
                            ],
                        }),
                        new TableCell({
                            borders,
                            children: [new Paragraph('')],
                        }),
                        new TableCell({
                            borders: borders,
                            children: [
                                new Paragraph({
                                    children: [new TextRun({ text: 'Директор' })],
                                }),
                            ],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'ООО «Инженерные изыскания»',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableCell({ borders, children: [new Paragraph('')] }),
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: 'ООО «Предприятие»' }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [new TextRun({ text: 'Гелета С. С.' })],
                                }),
                            ],
                        }),
                        new TableCell({ borders, children: [new Paragraph('')] }),
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [new TextRun({ text: 'Иванов Х. Х.' })],
                                }),
                            ],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({ borders, children: [new Paragraph('')] }),
                        new TableCell({ borders, children: [new Paragraph('')] }),
                        new TableCell({ borders, children: [new Paragraph('')] }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: '«____» _______________ 2024 г.',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableCell({ borders, children: [new Paragraph('')] }),
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: '«____» _______________ 2024 г.',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'М.П.',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableCell({ borders, children: [new Paragraph('')] }),
                        new TableCell({
                            borders,
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: 'М.П.',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        });
    };

    const getTechnicalTaskBody = (data) => {
        let curNumber = 0;
        let curChildNumber;
        const rows = data.map((row) => {
            const cells = [];

            if (row.isFather) {
                curNumber += 1;
                curChildNumber = 0;

                cells.push(
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: curNumber.toString(),
                                verticalAlign: VerticalAlign.TOP,
                            }),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: row.dataName,
                            }),
                        ],
                        verticalAlign: VerticalAlign.TOP,
                        columnSpan: 3, // какой-то баг библиотеки вместо 2 надо писать 3
                    })
                );
            } else if (row.isChild) {
                curChildNumber += 1;
                cells.push(
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: curNumber + '.' + curChildNumber,
                                verticalAlign: VerticalAlign.TOP,
                            }),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: row.dataName,
                            }),
                        ],
                        verticalAlign: VerticalAlign.TOP,
                        columnSpan: 2,
                    }),
                    new TableCell({
                        children: getParagraphs(row.data),
                        verticalAlign: VerticalAlign.TOP,
                    })
                );
            } else {
                curNumber += 1;
                cells.push(
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: curNumber.toString(),
                                verticalAlign: VerticalAlign.TOP,
                            }),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: row.dataName,
                            }),
                        ],
                        verticalAlign: VerticalAlign.TOP,
                        columnSpan: 2,
                    }),
                    new TableCell({
                        children: getParagraphs(row.data),
                        verticalAlign: VerticalAlign.TOP,
                    })
                );
            }

            return new TableRow({
                cantSplit: true,
                children: cells,
            });
        });

        return new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            rows,
        });
    };

    const getDoc = () =>
        new Document({
            styles,
            sections: [
                {
                    properties: {
                        page: {
                            margin: {
                                top: 500,
                                right: 500,
                                bottom: 500,
                                left: 1000,
                            },
                        },
                    },
                    children: [
                        getSignatoriesData(),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    break: 2,
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                        }),

                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'ЗАДАНИЕ',
                                    bold: true,
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'на выполнение инженерно-экологических изысканий',
                                    bold: true,
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                        }),
                        getTechnicalTaskBody(catalog.printData),
                    ],
                    footers,
                },
            ],
        });

    const generateDocx = () => {
        Packer.toBlob(getDoc()).then((blob) => {
            saveAs(blob, 'ИЭИ_ТЗ.doc');
        });
    };

    return (
        <div>
            <Button variant="outline-primary" onClick={generateDocx}>
                Скачать задание на изыскания
            </Button>
        </div>
    );
};

export default observer(ExampleDOCX);
