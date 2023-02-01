const Sequelize = require("sequelize");
module.exports=function(sequelize,DataTypes){
    return sequelize.define('Register',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }

   },  {
    sequelize,
    tableName: 'Register',
    timestamps: true,
    createdAt: "created_at", // alias createdAt as created_at
    updatedAt: "updated_at",
    indexes: 
    [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
});
}