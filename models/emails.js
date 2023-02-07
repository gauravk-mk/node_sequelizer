'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}) {
      // define association here
      //one to many relation of user to emails
      // this.belongsTo(User, { foreignkey: 'UserId'})

    }
  }
  Emails.init({
    userEmail:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    emailType:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    emailTemplateJSON:{
      type: DataTypes.JSONB,
      allowNull:true,
    },
    emailStatus:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    emailLink:{
      type: DataTypes.STRING,
      allowNull:true,
    }

  }, {
    sequelize,
    tableName: 'emails',
    modelName: 'Emails',
  });
  return Emails;
};