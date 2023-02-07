'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emails');
  }
};