import sequelize from '../sequelize.js';
import database, { BOOLEAN, STRING, TEXT } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const { DataTypes } = database;

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Role = sequelize.define('role', {
    name: { type: DataTypes.STRING, primaryKey: true },
});

const UserRole = sequelize.define('user_role', {
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    roleName: { type: DataTypes.STRING, references: { model: Role, key: 'name' } },
});

Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'roleName',
});
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });

const Project = sequelize.define('project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    lendArea: { type: DataTypes.STRING },
    lendExtension: { type: DataTypes.STRING },
    objectType: { type: DataTypes.STRING },
    customer: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
});

const ProjectSurvey = sequelize.define('projectSurvey', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER },
    survey: { type: DataTypes.STRING },
    variant: { type: DataTypes.STRING },
    unit: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER },
    subcategory: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    objectType: { type: DataTypes.STRING },
    normDoc: { type: DataTypes.STRING },
    justification: { type: DataTypes.STRING },
    handler: { type: DataTypes.STRING },
    buildType: { type: DataTypes.STRING },
});

const ProjectSurveyProp = sequelize.define('projectSurveyProp', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
    unit: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER },
});

const Variant = sequelize.define('variant', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    unit: { type: DataTypes.STRING, allowNull: false },
    defaultQuantity: { type: DataTypes.FLOAT, allowNull: true },
    quantityCalculatorName: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.INTEGER, allowNull: false },
    isObjectTypeLine: { type: BOOLEAN, allowNull: true, defaultValue: null },
    normDoc: { type: DataTypes.TEXT, defaultValue: '' },
    justification: { type: DataTypes.TEXT, defaultValue: '' },
    properties: { type: DataTypes.TEXT, defaultValue: '' },
    dynamicPriceIdAndLevel: { type: DataTypes.TEXT },
    priceAndQuantityCalcData: { type: DataTypes.JSONB },
    isProduction: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // calcData
    calcData: { type: DataTypes.JSONB }, // перестроить фронт

    isObjectTypeLine: { type: DataTypes.BOOLEAN }, // впихнуть в calcData и удалить
    lendAreaInSqM: { type: DataTypes.INTEGER }, // впихнуть в calcData и удалить
    trackWidthInM: { type: DataTypes.INTEGER }, // впихнуть в calcData и удалить
    trackLengthInM: { type: DataTypes.INTEGER }, // впихнуть в calcData и удалить
    testingSitesNumberPerFiveHa: { type: DataTypes.INTEGER }, // впихнуть в calcData и удалить

    generalData: { type: DataTypes.JSONB },
    customerData: { type: DataTypes.JSONB },
    contractorData: { type: DataTypes.JSONB },
});

const validLinkRoles = ['calculation', 'offer', 'offerRequest'];
const ProjectLink = sequelize.define('projectLink', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    linkRole: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [validLinkRoles],
                msg: `Invalid linkRole. Valid roles are: ${validLinkRoles.join(', ')}.`,
            },
        },
    },
    description: { type: DataTypes.STRING },
    regionId: { type: DataTypes.STRING },
    objectName: { type: DataTypes.STRING },
    isObjectTypeLine: { type: DataTypes.BOOLEAN },

    creatorId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    // recipientId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    // contactInfo
    contactEmail: { type: DataTypes.STRING },
    contactPhone: { type: DataTypes.INTEGER },
    message: { type: DataTypes.TEXT },

    // projectData
    projectData: { type: DataTypes.JSONB }, // раскидать по остальным датам и настроить фронт

    calcData: { type: DataTypes.JSONB },
    generalData: { type: DataTypes.JSONB },
    variants: { type: DataTypes.JSONB },
    // customerData
    customerName: { type: DataTypes.STRING },
    customerCompanyName: { type: DataTypes.STRING },
    customerLegalAddress: { type: DataTypes.STRING },
    customerPostalAddress: { type: DataTypes.STRING },
    customerPhone: { type: DataTypes.STRING },
    customerEmail: { type: DataTypes.STRING },
    customerSignatoryPosition: { type: DataTypes.STRING },
    customerSignatorySurname: { type: DataTypes.STRING },
    customerSignatoryName: { type: DataTypes.STRING },
    customerSignatoryPatronymic: { type: DataTypes.STRING },
    customerTIN: { type: DataTypes.INTEGER },
    // contractorData
    contractorName: { type: DataTypes.STRING },
    contractorCompanyName: { type: DataTypes.STRING },
    contractorLegalAddress: { type: DataTypes.STRING },
    contractorPostalAddress: { type: DataTypes.STRING },
    contractorPhone: { type: DataTypes.STRING },
    contractorEmail: { type: DataTypes.STRING },
    contractorSignatoryPosition: { type: DataTypes.STRING },
    contractorSignatorySurname: { type: DataTypes.STRING },
    contractorSignatoryName: { type: DataTypes.STRING },
    contractorSignatoryPatronymic: { type: DataTypes.STRING },
    contractorTIN: { type: DataTypes.INTEGER },
});

const ProjectLinkRecipient = sequelize.define('project_link_recipient', {
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    projectLinkId: {
        type: DataTypes.UUID,
        references: { model: ProjectLink, key: 'id' },
    },
});

const BasketVariant = sequelize.define('basketVariant', {
    quantity: { type: DataTypes.FLOAT, defaultValue: 1 },
});

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Subcategory = sequelize.define('subcategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Survey = sequelize.define('survey', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
});

// const ObjectType = sequelize.define('objectType', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     order: { type: DataTypes.INTEGER, allowNull: false },
//     name: { type: DataTypes.STRING, allowNull: false },
//     description: { type: DataTypes.STRING },
// });

// const Handler = sequelize.define('handler', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, unique: true, allowNull: false },
//     description: { type: DataTypes.STRING, unique: true, allowNull: false },
// });

const VariantProp = sequelize.define('variantProp', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, defaultValue: '' },
    unit: { type: DataTypes.STRING, defaultValue: '' },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Scenario = sequelize.define('scenario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, defaultValue: '' },
    isObjectTypeLine: { type: DataTypes.BOOLEAN },
    isProduction: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

const Region = sequelize.define('regions', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    isProduction: { type: DataTypes.BOOLEAN, allowNull: false },
});

const ScenarioVariant = sequelize.define('scenarioVariant', {});

User.hasMany(Project, { onDelete: 'CASCADE' });
Project.belongsTo(User);

Project.hasMany(ProjectSurvey, { onDelete: 'CASCADE' });
ProjectSurvey.belongsTo(Project);

ProjectSurvey.hasMany(ProjectSurveyProp, { onDelete: 'CASCADE' });
ProjectSurveyProp.belongsTo(ProjectSurvey);

// many-to-many
Variant.belongsToMany(Basket, { through: BasketVariant, onDelete: 'CASCADE' });
Basket.belongsToMany(Variant, { through: BasketVariant, onDelete: 'CASCADE' });
// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
Variant.hasMany(BasketVariant);
BasketVariant.belongsTo(Variant);
Basket.hasMany(BasketVariant);
BasketVariant.belongsTo(Basket);

Category.hasMany(Subcategory, { onDelete: 'RESTRICT' }); // 1
Subcategory.belongsTo(Category);

Subcategory.hasMany(Survey, { onDelete: 'RESTRICT' }); // 2
Survey.belongsTo(Subcategory);

Survey.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Survey);

// ObjectType.hasMany(Variant, { onDelete: 'RESTRICT' });
// Variant.belongsTo(ObjectType);

// Handler.hasMany(Variant, { onDelete: 'RESTRICT' });
// Variant.belongsTo(Handler);

Variant.hasMany(VariantProp, { onDelete: 'CASCADE' });
VariantProp.belongsTo(Variant);

// many-to-many
Variant.belongsToMany(Scenario, {
    through: ScenarioVariant,
    onDelete: 'CASCADE',
    // foreignKey: 'variantId'
});
Scenario.belongsToMany(Variant, {
    through: ScenarioVariant,
    onDelete: 'CASCADE',
    // foreignKey: 'surveyScenarioId'
});
// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
Variant.hasMany(ScenarioVariant);
ScenarioVariant.belongsTo(Variant);
Scenario.hasMany(ScenarioVariant);
ScenarioVariant.belongsTo(Scenario);

Region.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Region);

Region.hasMany(Basket, { onDelete: 'RESTRICT' });
Basket.belongsTo(Region);

ProjectLink.belongsToMany(User, {
    through: ProjectLinkRecipient,
    foreignKey: 'projectLinkId',
});
User.belongsToMany(ProjectLink, { through: ProjectLinkRecipient, foreignKey: 'userId' });

export {
    User,
    UserRole,
    Project,
    ProjectSurvey,
    ProjectSurveyProp,
    Variant,
    Basket,
    BasketVariant,
    Category,
    Subcategory,
    Survey,
    // ObjectType,
    // Handler,
    VariantProp,
    Scenario,
    ScenarioVariant,
    Region,
    ProjectLink,
};
