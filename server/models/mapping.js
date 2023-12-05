import sequelize from '../sequelize.js';
import database, { STRING } from 'sequelize';

const { DataTypes } = database;

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
});

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    lendArea: {type: DataTypes.STRING},
    lendExtension: {type: DataTypes.STRING},
    objectType: {type: DataTypes.STRING},
    customer: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
});

const ProjectSurvey = sequelize.define('projectSurvey', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER},
    survey: {type: DataTypes.STRING},
    variant: {type: DataTypes.STRING},
    unit: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER},
    subcategory: {type: DataTypes.STRING},
    category: {type: DataTypes.STRING},
    objectType: {type: DataTypes.STRING},
    normDoc: {type: DataTypes.STRING},
    justification: {type: DataTypes.STRING},
    handler: {type: DataTypes.STRING},
    buildType: {type: DataTypes.STRING},
});

const ProjectSurveyProp = sequelize.define('projectSurveyProp', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING},
    unit: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER},
});

const Variant = sequelize.define('variant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
});

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketVariant = sequelize.define('basketVariant', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
});

const NormDoc = sequelize.define('normDoc', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});

const Justification = sequelize.define('justification', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
});

const Unit = sequelize.define('unit', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
});

const Subcategory = sequelize.define('subcategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
});

const Survey = sequelize.define('survey', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
});

const ObjectType = sequelize.define('objectType', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
});

const Handler = sequelize.define('handler', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING},
});

const VariantProp = sequelize.define('variantProp', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING, allowNull: false},
    unit: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER},
});

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

NormDoc.hasMany(Variant, {onDelete: 'RESTRICT'});
Variant.belongsTo(NormDoc);

Justification.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Justification);

Unit.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Unit);

Category.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Category);

Subcategory.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Subcategory);

Survey.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Survey);

ObjectType.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(ObjectType);

Handler.hasMany(Variant, { onDelete: 'RESTRICT' });
Variant.belongsTo(Handler);

Variant.hasMany(VariantProp, { onDelete: 'CASCADE' });
VariantProp.belongsTo(Variant);

export {
    User,
    Project,
    ProjectSurvey,
    ProjectSurveyProp,

    Variant,
    Basket,
    BasketVariant,
    NormDoc,
    Justification,
    Unit,
    Category,
    Subcategory,
    Survey,
    ObjectType,
    Handler,
    VariantProp
};