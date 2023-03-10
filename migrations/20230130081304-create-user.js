'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique:true
        
      },
      password: {
        type: Sequelize.STRING
      },
      companyName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      designation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      technologyWorkingOn: {
        allowNull: true,
        type: Sequelize.STRING
      },
      companyLocation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isValidate:{
        type: Sequelize.BOOLEAN
      },
      validatedOn:{
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};