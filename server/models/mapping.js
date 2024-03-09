import sequelize from '../sequelize.js';
import database, { BOOLEAN, STRING, TEXT } from 'sequelize';

const { DataTypes } = database;

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

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
    isProduction: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isObjectTypeLine: { type: DataTypes.BOOLEAN },
    lendAreaInSqM: { type: DataTypes.INTEGER },
    trackWidthInM: { type: DataTypes.INTEGER },
    trackLengthInM: { type: DataTypes.INTEGER },
    testingSitesNumberPerFiveHa: { type: DataTypes.INTEGER },
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

const ObjectType = sequelize.define('objectType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
});

const Handler = sequelize.define('handler', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, unique: true, allowNull: false },
});

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

ObjectType.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(ObjectType);

Handler.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Handler);

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

export {
    User,
    Project,
    ProjectSurvey,
    ProjectSurveyProp,
    Variant,
    Basket,
    BasketVariant,
    Category,
    Subcategory,
    Survey,
    ObjectType,
    Handler,
    VariantProp,
    Scenario,
    ScenarioVariant,
};
