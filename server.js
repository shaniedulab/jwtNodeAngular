const express=require('express');
const  config = require('./config/default');
const app=express()
const PORT=config.api.PORT;
const {Sequelize,DataTypes} = require("sequelize");
const bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
const cors=require('cors')
const cookieparser = require('cookie-parser');
const router=require('./test');


app.use(cors({
    credentials: true,
}));
app.use(cookieparser())
app.use(express.json());
app.use(router)


const sequelize = new Sequelize(
 'jwt',
 'root',
 '1234',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const register=sequelize.define('register',{
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
tableName: 'register',
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

const todo=sequelize.define('todo',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    todo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},  {
sequelize,
tableName: 'todo',
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


 sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

app.post('/postRegister', async (req, res) =>{
    console.log("body data is ==>",req.body)
    try{
        if(req.body.email){
            const findEmail=  await register.findOne({where:{ email:req.body.email}})
            if(findEmail){
            res.json({
                status:400,
                message:'Email already exists'
            })
            }else{
            const Register =await register.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            })
            if(Register){
                res.status(200).json({
                    status:200,
                    data:Register

                })
            }else{
                res.json({
                    status:400,
                    message:'Unable to register'
                })
            }
        }   
    }

    } catch(error){
        console.log("error is " , error)
    }
    
})

app.post('/login', async (req, res) =>{
    console.log("body data is ==>",req.body)
    try{
        const data= await register.findOne({
            where:{
                email: req.body.email,
                password: req.body.password }
            })  
            if(!data){
                res.json({
                    status:400,
                    message:'Unable to login'})
            }else{
                    req.user =data.id
                    console.log(req.user)
                    const userID =req.user
                    module.exports.userID =userID
            jwt.sign({data},"secretkey",{expiresIn:'2h'},(err ,token)=>{
                if(token){
                    res.json({
                        status:200,
                        data:token })
                }else{
                    res.json({
                        status:401,
                        message:'Unauthorized'
                    })
                }
                })
            }
   }catch(err){
        console.log('Unable to Login',err.message)
   }

    // try{
    //     const loginData=await register.findOne({
    //         where:{
    //             email:req.body.email,
    //             password: req.body.password 
    //         }})
    //         if(loginData){
    //             const accessToken=jwt.sign({loginData},"accessSecretkey",{expiresIn:'3m'});
    //             const reffreshToken=jwt.sign({loginData},"refreshSecretkey",{expiresIn:'1d'});
    //             res.cookie('jwt',reffreshToken,{ httpOnly: true, 
    //                 sameSite: 'None', secure: true, 
    //                 maxAge: 24 * 60 * 60 * 1000 })
                
    //              res.json({
    //                     status:200,
    //                     data:accessToken,
    //                     cookie:reffreshToken
    //                 })
               
    //         }else{
    //             res.json({'stasus':406,
    //             message: 'Invalid credentials' });
    //         }
    // }catch(error){
    //     console.log("error is /login", error.message)
    // }
    
})

// app.post('/addTodo',async (req, res) =>{
//     console.log("addtodo,re.body")
//     console.log("addtodo,re.body",req.userId)

//     try{
//         const addtodo=await todo.create({
//             todo:req.body.addtodo,
//             user_id:req.userId
//         })
//         console.log(addtodo)
//         if(addtodo){
//             res.json({
//                 status:200,
//                 data:addtodo
//             })
//         }else{
//             res.json({
//                 status:400,
//                 message:'todo not added successfully'
//             })
//         }
//     }catch(error){
//         console.log("error is /addTodo", error.message)
//     }
// })


app.get('/welcome',verifyToken,(req,res)=>{
    jwt.verify(req.token,"secretkey",(err,token)=>{
        console.log(req.token)
        if(err){
            res.send("failed to access ")
        }else{
             res.send("Welcome")
        }
    })
    
})
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }
  
  

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

module.exports=register