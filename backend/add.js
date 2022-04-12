const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("[bd_groupo]", "[root]", "[1029!rieN]", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("Users", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

User.sync().then((res) => {
  User.create({ firstName: "Nathan", lastName: "Sebhastian" }).then((res) => {
    console.log(`Insert successful: ${res.id}`);
    sequelize.close();
    console.log("connection closed");
  });
});