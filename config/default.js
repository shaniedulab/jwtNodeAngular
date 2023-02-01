module.exports={
    api:{
        PORT:3000
    },
    mysqldb:{
        HOST: "localhost",
        USER: "root",
        PASSWORD: "1234",
        DB: "jwt",
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      },
}