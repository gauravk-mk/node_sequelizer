'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return {...this.get(), id:undefined}
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    designation:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    technologyWorkingOn:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyLocation:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    isValidate:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    validatedOn:{
      type: DataTypes.DATE,
      allowNull:true
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};