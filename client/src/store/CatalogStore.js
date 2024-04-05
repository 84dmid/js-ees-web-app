import { makeAutoObservable } from 'mobx';
import { getPriceAndDefaultQuantity } from '../calculators/variantPriceHandler';
import { quantityCalculators } from '../calculators/quantityCalculators';

const initCalcData = {
    isObjectTypeLine: null,
    plotAreaInSqM: null,
    testingSitesNumberPerFiveHa: null,
    trackLengthInM: null,
    trackWidthInM: null,
};

const initProjectData = {
    // initFieldset
    workBasis: null,
    urbanDevelopmentActivityType: null,
    surveyStage: null,
    // GeneralInfoFieldset
    name: null,
    address: null,
    cadastralNumber: null,
    boundariesAreaData: null,
    boundariesTrackData: null,
    technicalCharacteristic: null,
    // IdentInfoFieldset
    purpose: null,
    isTransportInfrastructure: null,
    isDangerousNaturalProcesses: null,
    dangerousNaturalProcesses: null,
    isDangerousProductionProcesses: null,
    dangerousProductionProcesses: null,
    fireDanger: null,
    isConstantPeoplePresence: null,
    responsibilityLevel: null,
    // LandInfoFieldset
    landUseAndLandowners: null,
    negativeImpactOnEnvironmentCategory: null,
    // default data
    pollutedAreaData: 'Данные отсутствуют',
    environmentalRestrictionsZoneData: 'Данные отсутствуют',
    surveysGoals:
        'Получение материалов и данных о состоянии компонентов окружающей среды и возможных источниках её загрязнения, необходимых для подготовки проектной документации',
    surveyTasks:
        '1. Оценка экологического состояния территории с позиций возможности размещения проектируемого объекта.\n2. Предварительный прогноз возможных изменений компонентов окружающей среды при реализации намечаемой градостроительной деятельности, а также ее возможных негативных последствий.\n3. Разработка предложений и рекомендаций для принятия решений по организации природоохранных мероприятий',
    surveysType: 'Инженерно-экологические изыскания',
    existingAndPotentialSourcesOfEnvironmentalPollutionInfo: 'Данные отсутствуют',
    estimatedTechnogenicImpactsOnEnvironment:
        'Определяется по результатам разработки разделов проектной документации',
    plannedParametersOfTechnologicalProcesses: 'Определяется при проектировании',
    possibleEmergenciesInfo: 'Данные отсутствуют',
    surveysAdditionalRequirements:
        'Необходимость выполнения отдельных видов работ и исследований установить в программе на проведение инженерно-экологических изысканий.\nПри разработке программы учесть предлагаемый перечень исследований (см. приложения 1).\nЕсли исполнитель работ считает предлагаемый перечень избыточным или недостаточным для прохождения экспертизы, представить свой вариант с соответствующим обоснованием',
    scientificSupportRequirements: 'Требования отсутствуют',
    accuracyRequirements: 'Требования отсутствуют',
    prepareProposalsAndRecommendation: 'Требования отсутствуют',
    qualityControlRequirements:
        'Обеспечить внутренний контроль качества на всех этапах выполнения инженерных изысканий.\nОкончательную приемку работ производит представитель заказчика, с подписанием акта приемки выполненных работ (при наличии такого условия в договоре)',
    surveyResultsCompositionFormAndFormatRequirements:
        'Требования определяются договором',
    regulatoryDocumentsList:
        'СП 47.13330.2016 Инженерные изыскания для строительства. Основные положения',
    customerSuppliedData: 'Не предусмотрено',
    applicationsList:
        '1. Ситуационный план участка изысканий.\n2. Предлагаемый состав исследований\n3. Обоснование предлагаемого объёма исследований',
    // ProgramInfoFieldset1
    volumeName: 'технический отчет по результатам инженерно-экологических изысканий',
    volumeCode: null,
    volumeNumber: null,
    preliminaryPollutedAreaData: null,
    preliminaryRestrictionsZoneData: null,
    // ProgramInfoFieldset2
    programDeviationsJustification: 'Отступления не предусмотрены',
    impactZoneJustification: 'В составе изысканий не предусмотрено',
    studyAreaBoundariesJustification:
        'Границы участка изысканий приняты в соответствии с заданием',
    environmentalAssessmentCriteria:
        'Критерии представлены в подразделе 4.3 настоящей программы',
};

const initProjectValid = {
    // initFieldset
    workBasis: null,
    urbanDevelopmentActivityType: null,
    surveyStage: null,
    // GeneralInfoFieldset
    name: null,
    address: null,
    cadastralNumber: null,
    boundariesAreaData: null,
    boundariesTrackData: null,
    technicalCharacteristic: null,
    // IdentInfoFieldset
    purpose: null,
    isTransportInfrastructure: null,
    isDangerousNaturalProcesses: null,
    dangerousNaturalProcesses: null,
    isDangerousProductionProcesses: null,
    dangerousProductionProcesses: null,
    fireDanger: null,
    isConstantPeoplePresence: null,
    responsibilityLevel: null,
    // LandInfoFieldset
    landUseAndLandowners: null,
    negativeImpactOnEnvironmentCategory: null,
    // DefaultInfoFieldset
    pollutedAreaData: null,
    environmentalRestrictionsZoneData: null,
    surveysGoals: null,
    surveyTasks: null,
    surveysType: null,
    existingAndPotentialSourcesOfEnvironmentalPollutionInfo: null,
    estimatedTechnogenicImpactsOnEnvironment: null,
    plannedParametersOfTechnologicalProcesses: null,
    possibleEmergenciesInfo: null,
    surveysAdditionalRequirements: null,
    scientificSupportRequirements: null,
    accuracyRequirements: null,
    prepareProposalsAndRecommendation: null,
    qualityControlRequirements: null,
    surveyResultsCompositionFormAndFormatRequirements: null,
    regulatoryDocumentsList: null,
    customerSuppliedData: null,
    applicationsList: null,
    // ProgramInfoFieldset1
    volumeName: null,
    volumeCode: null,
    volumeNumber: null,
    preliminaryPollutedAreaData: null,
    preliminaryRestrictionsZoneData: null,
    // ProgramInfoFieldset1
    programDeviationsJustification: null,
    impactZoneJustification: null,
    studyAreaBoundariesJustification: null,
    environmentalAssessmentCriteria: null,
};

const initContractorData = {
    contractorCompanyName: null,
    contractorLegalAddress: null,
    contractorPostalAddress: null,
    contractorTIN: null,
    contractorPhone: null,
    contractorEmail: null,
    contractorSignatoryPosition: null,
    contractorSignatorySurname: null,
    contractorSignatoryName: null,
    contractorSignatoryPatronymic: null,
    contractorSigningDate: new Date().getFullYear(),
};

const initCustomerData = {
    customerCompanyName: null,
    customerLegalAddress: null,
    customerPostalAddress: null,
    customerTIN: null,
    customerPhone: null,
    customerEmail: null,
    customerSignatoryPosition: null,
    customerSignatorySurname: null,
    customerSignatoryName: null,
    customerSignatoryPatronymic: null,
    customerSigningDate: new Date().getFullYear(),
};

class CatalogStore {
    _initCatalog = [];
    _initRegions = [];

    _regionId = null;
    _calcData = initCalcData;
    _generalData = initProjectData;
    _customerData = initCustomerData;
    _contractorData = initContractorData;

    _projectValid = initProjectValid;

    _projectVariants = [];
    _projectVariantIds = new Set();
    _projectVariantQuantities = [];

    _showOnlyCheckedVariants = false;
    _showOnlyCheckedSurveys = false;

    constructor() {
        makeAutoObservable(this);
    }

    // initData;
    get initCatalog() {
        return this._initCatalog;
    }
    set initCatalog(initCatalog) {
        this._initCatalog = initCatalog;
    }

    get initRegions() {
        return this._initRegions;
    }
    set initRegions(initRegions) {
        this._initRegions = initRegions;
    }

    //projectData
    get regionId() {
        return this._regionId;
    }
    set regionId(regionId) {
        this._regionId = regionId;
    }
    get regionName() {
        return this._initRegions.find((region) => region.id === this._regionId)?.name;
    }

    get calcData() {
        return this._calcData;
    }
    set calcData(data) {
        this._calcData = { ...initCalcData, ...data };
    }

    get generalData() {
        return this._generalData;
    }
    set generalData(data) {
        this._generalData = data;
    }

    get customerData() {
        return this._customerData;
    }
    set customerData(data) {
        this._customerData = data;
    }

    get contractorData() {
        return this._contractorData;
    }
    set contractorData(data) {
        this._contractorData = data;
    }

    // validation
    get projectValid() {
        return this._projectValid;
    }
    set projectValid(isValid) {
        this._projectValid = isValid;
    }

    setValid(prop, value) {
        const validator = {
            // initFieldset
            workBasis: (value) => value.trim() !== '',
            urbanDevelopmentActivityType: (value) => value.trim() !== '',
            surveyStage: function (value) {
                return this._generalData.urbanDevelopmentActivityType ===
                    'Архитектурно-строительное проектирование' && value
                    ? value.trim() !== ''
                    : this._generalData.urbanDevelopmentActivityType !==
                      'Архитектурно-строительное проектирование'
                    ? null
                    : false;
            }.bind(this),
            // GeneralInfoFieldset
            name: (value) => value.trim() !== '',
            address: (value) => value.trim() !== '',
            cadastralNumber: (value) => value.trim() !== '',
            boundariesAreaData: (value) => value.trim() !== '',
            boundariesTrackData: (value) => value.trim() !== '',
            technicalCharacteristic: (value) => value.trim() !== '',
            // IdentInfoFieldset
            purpose: (value) => value.trim() !== '',
            isTransportInfrastructure: (value) => value.trim() !== '',
            isDangerousNaturalProcesses: (value) => value.trim() !== '',
            dangerousNaturalProcesses: function (value) {
                return this._generalData.isDangerousNaturalProcesses === 'да' && value
                    ? value.trim() !== ''
                    : this._generalData.isDangerousNaturalProcesses !== 'да'
                    ? null
                    : false;
            }.bind(this),
            isDangerousProductionProcesses: (value) => value.trim() !== '',
            dangerousProductionProcesses: function (value) {
                return this._generalData.isDangerousProductionProcesses === 'да' && value
                    ? value.trim() !== ''
                    : this._generalData.isDangerousProductionProcesses !== 'да'
                    ? null
                    : false;
            }.bind(this),

            fireDanger: (value) => value.trim() !== '',
            isConstantPeoplePresence: (value) => value.trim() !== '',
            responsibilityLevel: (value) => value.trim() !== '',
            // LandInfoFieldset
            landUseAndLandowners: (value) => value.trim() !== '',
            negativeImpactOnEnvironmentCategory: (value) => value.trim() !== '',
            // DefaultInfoFieldset1
            pollutedAreaData: (value) => value.trim() !== '',
            environmentalRestrictionsZoneData: (value) => value.trim() !== '',
            surveysGoals: (value) => value.trim() !== '',
            surveyTasks: (value) => value.trim() !== '',
            surveysType: (value) => value.trim() !== '',
            existingAndPotentialSourcesOfEnvironmentalPollutionInfo: (value) =>
                value.trim() !== '',
            estimatedTechnogenicImpactsOnEnvironment: (value) => value.trim() !== '',
            plannedParametersOfTechnologicalProcesses: (value) => value.trim() !== '',
            possibleEmergenciesInfo: (value) => value.trim() !== '',
            surveysAdditionalRequirements: (value) => value.trim() !== '',
            scientificSupportRequirements: (value) => value.trim() !== '',
            accuracyRequirements: (value) => value.trim() !== '',
            prepareProposalsAndRecommendation: (value) => value.trim() !== '',
            qualityControlRequirements: (value) => value.trim() !== '',
            surveyResultsCompositionFormAndFormatRequirements: (value) =>
                value.trim() !== '',
            regulatoryDocumentsList: (value) => value.trim() !== '',
            customerSuppliedData: (value) => value.trim() !== '',
            applicationsList: (value) => value.trim() !== '',
            // ProgramInfoFieldset
            programDeviationsJustification: (value) => value.trim() !== '',
            preliminaryPollutedAreaData: (value) => value.trim() !== '',
            preliminaryRestrictionsZoneData: (value) => value.trim() !== '',
            impactZoneJustification: (value) => value.trim() !== '',
            studyAreaBoundariesJustification: (value) => value.trim() !== '',
            environmentalAssessmentCriteria: (value) => value.trim() !== '',
            // VolumeInfoFieldset
            volumeName: (value) => value.trim() !== '',
            volumeCode: (value) => value.trim() !== '',
            volumeNumber: (value) => value.trim() !== '',
            // ContractorInfoFieldset
            contractorCompanyName: (value) => value.trim() !== '',
            contractorLegalAddress: (value) => value.trim() !== '',
            contractorPostalAddress: (value) => value.trim() !== '',
            contractorTIN: (value) => value.trim() !== '',
            contractorPhone: (value) => value.trim() !== '',
            contractorEmail: (value) => value.trim() !== '',
            contractorSignatoryPosition: (value) => value.trim() !== '',
            contractorSignatorySurname: (value) => value.trim() !== '',
            contractorSignatoryName: (value) => value.trim() !== '',
            contractorSignatoryPatronymic: (value) => value.trim() !== '',
            // CustomerInfoFieldset
            customerCompanyName: (value) => value.trim() !== '',
            customerLegalAddress: (value) => value.trim() !== '',
            customerPostalAddress: (value) => value.trim() !== '',
            customerTIN: (value) => value.trim() !== '',
            customerPhone: (value) => value.trim() !== '',
            customerEmail: (value) => value.trim() !== '',
            customerSignatoryPosition: (value) => value.trim() !== '',
            customerSignatorySurname: (value) => value.trim() !== '',
            customerSignatoryName: (value) => value.trim() !== '',
            customerSignatoryPatronymic: (value) => value.trim() !== '',
        };
        const result = validator[prop](value);
        this._projectValid[prop] = result;
        return result;
    }

    _getVariantsByIds(variantIds) {
        const ids = new Set(variantIds);
        const variants = [];
        this._initCatalog.forEach((category) => {
            category.subcategories.forEach((subcategory) => {
                subcategory.surveys.forEach((survey) => {
                    survey.variants.forEach((variant) => {
                        if (ids.has(variant.id)) {
                            variants.push(variant);
                        }
                    });
                });
            });
        });
        return variants;
    }

    _iterateOverInitCatalog(variantsEditor) {
        return this._initCatalog
            .map((category) => {
                const subcategories = category.subcategories
                    .map((subcategory) => {
                        const surveys = subcategory.surveys
                            .map((survey) => {
                                const filteredVariants = variantsEditor(survey.variants);
                                return filteredVariants.length > 0
                                    ? { ...survey, variants: filteredVariants }
                                    : null;
                            })
                            .filter(Boolean);
                        return surveys.length > 0 ? { ...subcategory, surveys } : null;
                    })
                    .filter(Boolean);
                return subcategories.length > 0 ? { ...category, subcategories } : null;
            })
            .filter(Boolean);
    }

    _getVariantPrice(variant, projectVariants) {
        if (variant.priceAndQuantityCalcData !== null) {
            return getPriceAndDefaultQuantity(
                projectVariants,
                variant.priceAndQuantityCalcData
            ).price;
        } else {
            return variant.price;
        }
    }

    _getQuantity(variant, projectParams, projectVariants) {
        let number;
        let justification = variant.justification;

        if (variant.quantityCalculatorName) {
            const calcResult =
                quantityCalculators[variant.quantityCalculatorName](projectParams);
            number = calcResult.number;
            if (calcResult.justification) {
                justification = calcResult.justification;
            }
        } else if (variant.priceAndQuantityCalcData !== null) {
            number = getPriceAndDefaultQuantity(
                projectVariants,
                variant.priceAndQuantityCalcData
            ).quantity;
        } else if (variant.defaultQuantity) {
            number = variant.defaultQuantity;
        } else if (this._projectVariantIds.has(variant.id)) {
            number = this._projectVariantQuantities[variant.id];
        } else {
            number = 1;
        }

        return { number, justification };
    }

    get catalog() {
        const getChecked = (variant) => {
            if (this._projectVariantIds.has(variant.id)) {
                return true;
            } else {
                return false;
            }
        };

        const variantsEditor = (variants) => {
            let checkedSurveyIds = new Set();
            return variants
                .filter((variant) => {
                    if (this._calcData.isObjectTypeLine === null) return false;
                    return (
                        variant.isObjectTypeLine === this._calcData.isObjectTypeLine ||
                        variant.isObjectTypeLine === null
                    );
                })
                .map((variant) => {
                    if (getChecked(variant)) {
                        checkedSurveyIds.add(variant.surveyId);
                    }
                    const quantity = this._getQuantity(
                        variant,
                        this._calcData,
                        this._projectVariants
                    );
                    return {
                        ...variant,
                        justification: quantity.justification,
                        quantity: quantity.number,
                        price: this._getVariantPrice(variant, this._projectVariants),
                        checked: getChecked(variant),
                    };
                })
                .filter((variant) => {
                    if (this._showOnlyCheckedVariants) {
                        return variant.quantity > 0 && variant.checked;
                    } else if (this._showOnlyCheckedSurveys) {
                        return (
                            variant.quantity > 0 && checkedSurveyIds.has(variant.surveyId)
                        );
                    } else {
                        return variant.quantity > 0;
                    }
                });
        };

        return this._iterateOverInitCatalog(variantsEditor);
    }

    get projectCatalog() {
        const variantsEditor = (variants) => {
            return variants
                .filter((variant) => this._projectVariantIds.has(variant.id))
                .map((variant) => {
                    const quantity = this._getQuantity(
                        variant,
                        this._calcData,
                        this._projectVariants
                    );
                    return {
                        ...variant,
                        justification: quantity.justification,
                        quantity: quantity.number,
                        price: this._getVariantPrice(variant, this._projectVariants),
                    };
                })
                .filter((variant) => variant.quantity > 0);
        };

        return this._iterateOverInitCatalog(variantsEditor);
    }

    getCatalogByProjectLinkData(data) {
        const variantIds = new Set(
            data.basketVariants.map((variant) => variant.variantId)
        );
        const quantities = new Map(
            data.basketVariants.map((variant) => [variant.variantId, variant.quantity])
        );

        const getQuantity = (variant, projectParams, projectVariants) => {
            let number;
            let justification = variant.justification;

            if (variant.quantityCalculatorName) {
                const calcResult =
                    quantityCalculators[variant.quantityCalculatorName](projectParams);
                number = calcResult.number;
                if (calcResult.justification) {
                    justification = calcResult.justification;
                }
            } else if (variant.priceAndQuantityCalcData !== null) {
                number = getPriceAndDefaultQuantity(
                    projectVariants,
                    variant.priceAndQuantityCalcData
                ).quantity;
            } else if (variant.defaultQuantity) {
                number = variant.defaultQuantity;
            } else if (variantIds.has(variant.id)) {
                number = quantities.get(variant.id);
            } else {
                number = 1;
            }

            return { number, justification };
        };

        const variantsEditor = (variants) => {
            return variants
                .filter((variant) => variantIds.has(variant.id))
                .map((variant) => {
                    const quantity = getQuantity(
                        variant,
                        {
                            lendAreaInSqM: data.lendAreaInSqM,
                            testingSitesNumberPerFiveHa: data.testingSitesNumberPerFiveHa,
                            isObjectTypeLine: data.isObjectTypeLine,
                            trackLengthInM: data.trackLengthInM,
                        },
                        data.basketVariants
                    );
                    return {
                        ...variant,
                        justification: quantity.justification,
                        quantity: quantity.number,
                        price: this._getVariantPrice(variant, data.basketVariants),
                    };
                })
                .filter((variant) => variant.quantity > 0);
        };

        return this._iterateOverInitCatalog(variantsEditor);
    }

    getRegionNameById(id) {
        return this._initRegions.find((region) => region.id === id).name;
    }

    get projectVariants() {
        return this._projectVariants;
    }

    set projectVariants(variants) {
        this._projectVariants = variants;
        this._projectVariantIds = new Set(variants.map((variant) => variant.variantId));
        const variantQuantities = {};
        variants.forEach(
            (variant) => (variantQuantities[variant.variantId] = variant.quantity)
        );
        this._projectVariantQuantities = variantQuantities;
    }

    get projectSurveyCount() {
        return this._projectVariants.length;
    }

    get projectPrice() {
        return this._projectVariants.reduce((sum, variant) => {
            let price = variant.price;
            if (variant.priceAndQuantityCalcData !== null) {
                const data = getPriceAndDefaultQuantity(
                    this._projectVariants,
                    variant.priceAndQuantityCalcData
                );
                return data.price;
            }
            return sum + price * variant.quantity;
        }, 0);
    }

    // filters

    get showOnlyCheckedVariants() {
        return this._showOnlyCheckedVariants;
    }

    set showOnlyCheckedVariants(isShow) {
        this._showOnlyCheckedVariants = isShow;
        this._showOnlyCheckedSurveys = !isShow;
    }

    get showOnlyCheckedSurveys() {
        return this._showOnlyCheckedSurveys;
    }

    set showOnlyCheckedSurveys(isShow) {
        this._showOnlyCheckedSurveys = isShow;
        this._showOnlyCheckedVariants = !isShow;
    }

    get showAllCatalog() {
        return !this._showOnlyCheckedSurveys && !this._showOnlyCheckedVariants;
    }

    set showAllCatalog(isShow) {
        this._showOnlyCheckedSurveys = !isShow;
        this._showOnlyCheckedVariants = !isShow;
    }

    // printData

    get printData() {
        return [
            {
                dataName: 'Наименование объекта',
                data: this._generalData.name,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Местоположение объекта',
                data: this._generalData.address,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Основание для выполнения работ',
                data: this._generalData.workBasis,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Вид градостроительной деятельности',
                data: this._generalData.urbanDevelopmentActivityType,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Этап выполнения инженерных изысканий',
                data: this._generalData.surveyStage,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Идентификационные сведения о заказчике',
                data: this._customerData.customerCompanyName
                    ? `${this._customerData.customerCompanyName}\nИНН: ${
                          this._customerData.customerTIN || '—'
                      }\nЮр. адрес: ${
                          this._customerData.customerLegalAddress || '—'
                      }\nПочтовый адрес: ${
                          this._customerData.customerPostalAddress || '—'
                      }\nТелефон: ${this._customerData.customerPhone || '—'}\nE-mail: ${
                          this._customerData.customerEmail || '—'
                      }`
                    : null,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Идентификационные сведения об исполнителе',
                data: this._contractorData.contractorCompanyName
                    ? `${this._contractorData.contractorCompanyName}\nИНН: ${
                          this._contractorData.contractorTIN || '—'
                      }\nЮр. адрес: ${
                          this._contractorData.contractorLegalAddress || '—'
                      }\nПочтовый адрес: ${
                          this._contractorData.contractorPostalAddress || '—'
                      }\nТелефон: ${
                          this._contractorData.contractorPhone || '—'
                      }\nE-mail: ${this._contractorData.contractorEmail || '—'}`
                    : null,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Цели инженерно-экологических изысканий',
                data: this._generalData.surveysGoals,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Задачи инженерно-экологических изысканий',
                data: this._generalData.surveyTasks,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Вид инженерных изысканий',
                data: this._generalData.surveysType,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName: 'Идентификационные сведения об объекте',
                isFather: true,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Назначение объекта',
                data: this._generalData.purpose,
                isChild: true,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName:
                    'Принадлежность к объектам транспортной инфраструктуры и к другим объектам, функционально-технологические особенности которых влияют на их безопасность',
                data: this._generalData.isTransportInfrastructure,
                isChild: true,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName:
                    'Возможность опасных природных процессов и явлений и техногенных воздействий на территории, на которой будут осуществляться строительство, реконструкция и эксплуатация здания или сооружения',
                data: this._generalData.dangerousNaturalProcesses,
                isChild: true,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Принадлежность к опасным производственным объектам',
                data: this._generalData.dangerousProductionProcesses,
                isChild: true,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Пожарная и взрывопожарная опасность',
                data: this._generalData.fireDanger,
                isChild: true,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Наличие помещений с постоянным пребыванием людей',
                data: this._generalData.isConstantPeoplePresence,
                isChild: true,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: 'Уровень ответственности',
                data: this._generalData.responsibilityLevel,
                isChild: true,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },

            {
                dataName: 'Тип объекта капитального строительства',
                data: this._calcData.isObjectTypeLine ? 'Линейный' : 'Нелинейный',
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName:
                    'Краткая техническая характеристика объекта, включая размеры проектируемых зданий и сооружений',
                data: this._generalData.technicalCharacteristic,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Категория объекта капитального строительства как объекта, оказывающего негативное воздействие на окружающую среду',
                data: this._generalData.negativeImpactOnEnvironmentCategory,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName: this._calcData.isObjectTypeLine
                    ? 'Протяжённость и площадь трассы изысканий'
                    : 'Площадь участка изысканий',
                data: this._calcData.isObjectTypeLine
                    ? `Протяженность: ${
                          +this._calcData.trackLengthInM / 1000
                      } км.\bПлощадь: ${
                          (this._calcData.trackWidthInM * this._calcData.trackLengthInM) /
                          10000
                      } га.`
                    : `${+this.calcData.plotAreaInSqM / 10000} га`,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName: this._calcData.isObjectTypeLine
                    ? 'Данные о границах трассы (трасс), точках ее начала и окончания'
                    : 'Данные о границах участка изысканий',
                data: this._calcData.isObjectTypeLine
                    ? this._generalData.boundariesTrackData
                    : this._generalData.boundariesAreaData,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },

            {
                dataName: 'Общие сведения о землепользовании и землевладельцах',
                data: this._generalData.landUseAndLandowners,
                isDocument: {
                    technicalTask: true,
                    program: true,
                },
            },
            {
                dataName:
                    'Сведения о существующих и возможных источниках загрязнения окружающей среды',
                data: this._generalData
                    .existingAndPotentialSourcesOfEnvironmentalPollutionInfo,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Наличие в границах участка изысканий территорий с ранее выявленным загрязнением окружающей среды',
                data: this._generalData.pollutedAreaData,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Наличие на участке зон с особым режимом природопользования (зон экологических ограничений)',
                data: this._generalData.environmentalRestrictionsZoneData,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Предполагаемые техногенные воздействия объекта на окружающую среду',
                data: this._generalData.estimatedTechnogenicImpactsOnEnvironment,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Общие технические решения и основные параметры технологических процессов, планируемых к осуществлению в рамках градостроительной деятельности, необходимые для обоснования предполагаемых границ зоны воздействия объекта',
                data: this._generalData.plannedParametersOfTechnologicalProcesses,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Сведения о возможных аварийных ситуациях, типах аварий, мероприятиях по их предупреждению и ликвидации',
                data: this._generalData.possibleEmergenciesInfo,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName: 'Дополнительные требования к производству изысканий',
                data: this._generalData.surveysAdditionalRequirements,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Требования о необходимости научного сопровождения инженерно-экологических изысканий',
                data: this._generalData.scientificSupportRequirements,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Требования к точности и обеспеченности необходимых данных и характеристик при инженерно-экологических изысканиях, превышающие предусмотренные требованиями НД обязательного применения',
                data: this._generalData.accuracyRequirements,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Требования о подготовке предложений и рекомендаций для принятия решений по организации инженерной защиты территории, зданий и сооружений от опасных природных и техногенных процессов и устранению или ослаблению их влияния',
                data: this._generalData.prepareProposalsAndRecommendation,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Требования по обеспечению контроля качества при выполнении инженерно-экологических изысканий',
                data: this._generalData.qualityControlRequirements,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Требования к составу, форме и формату предоставления результатов инженерных изысканий, порядку их передачи заказчику',
                data: this._generalData.surveyResultsCompositionFormAndFormatRequirements,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Перечень нормативных документов, в соответствии с которыми необходимо выполнять инженерные изыскания',
                data: this._generalData.regulatoryDocumentsList,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName:
                    'Перечень передаваемых во временное пользование исполнителю инженерных изысканий, результатов ранее выполненных инженерных изысканий и исследований',
                data: this._generalData.customerSuppliedData,
                isDocument: {
                    technicalTask: true,
                },
            },
            {
                dataName: 'Список приложений',
                data: this._generalData.applicationsList,
                isDocument: {
                    technicalTask: true,
                },
            },
            // ProgramInfoFieldset
            {
                dataName:
                    'Обоснование отступлений от требований программы при их наличии',
                data: this._generalData.programDeviationsJustification,
                isDocument: {
                    program: true,
                },
            },
            {
                dataName:
                    'Предварительные сведения о наличии участков с ранее выявленным загрязнением окружающей среды',
                data:
                    this._generalData.preliminaryPollutedAreaData ||
                    this._generalData.pollutedAreaData,
                isDocument: {
                    program: true,
                },
            },
            {
                dataName:
                    'Предварительные сведения о наличии зон с особым режимом природопользования (зон экологических ограничений)',
                data:
                    this._generalData.preliminaryRestrictionsZoneData ||
                    this._generalData.environmentalRestrictionsZoneData,
                isDocument: {
                    program: true,
                },
            },
            {
                dataName:
                    'Обоснование предполагаемых границ зоны воздействия объекта капитального строительства',
                data: this._generalData.impactZoneJustification,
                isDocument: {
                    program: true,
                },
            },
            {
                dataName:
                    'Обоснование границ изучаемой территории при выполнении инженерно-экологических изысканий',
                data: this._generalData.studyAreaBoundariesJustification,
                isDocument: {
                    program: true,
                },
            },
            {
                dataName:
                    'Критерии оценки состояния окружающей среды, включая загрязнения отдельных компонентов среды (значения, установленные нормативными и/или методическими документами) с обоснованием и ссылкой на соответствующие документы',
                data: this._generalData.environmentalAssessmentCriteria,
                isDocument: {
                    program: true,
                },
            },
        ];
    }

    get technicalTaskData() {
        return this.printData.filter((row) => row.isDocument.technicalTask);
    }

    get programData() {
        return this.printData.filter((row) => row.isDocument.program);
    }
}

export default CatalogStore;
