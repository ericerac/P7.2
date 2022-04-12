// const { Sequelize } = require("sequelize");

//  const config = new Sequelize("[bd_groupo]", "[root]", "[1029!rieN]", {
//    host: "localhost",
//    dialect: "mysql",
//  });

//const {DataTypes} = require('sequelize, DataTypes');
// modele user

const dbConfig = require ('../config/db.config')
var Sequelize = require("sequelize");
var sequelize = new Sequelize(dbConfig);

/* Define Models */

module.exports = (sequelize,type) => {
  return sequelize.define("user", {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: type.STRING,
      allowNull: false,
    },
    lastName: {
      type: type.STRING,
      allowNull: false,
    },
    email: {
      type: type.STRING, unique: true,
      allowNull: false,
    },
    password: {
      type: type.STRING,
      allowNull: false,
      validate: {
        len: [8, 410]
      }
    },
    
  });
  
};
