


module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "1029!rieN",
    DB: "BD_groupo",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };


  // const sequelize = new Sequelize("bd_groupo", "root", "1029!rieN", {
  //   host: "localhost",
  //   dialect: "mysql",
  // });