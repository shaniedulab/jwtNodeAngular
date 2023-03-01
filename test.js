const router = require('express').Router();
let index=require('./server')
const tokenVerify = require('./middlware/verifyToken.js')

router.get('/testMiddlware',(req,res)=>{
    res.json({
        message:'TokenVerified successfully',
        status:200,
        data:req.token
    })
})

router.get('/getUserDetails', tokenVerify,async(req, res) => {
    try{
    const data=await index.register.findOne({
        where:{id:index.userId}
    })
    if(data){
        res.json({
            status:200,
            message:'successfully find',
            data:data
        })
       }else{
        res.json({
            status:404,
            message:'failed to find'
        })
       }
    }catch(err){
        res.json({
            status:400,
            message:'todo not added successfully'
        })
    }
})

router.post('/addTodo', tokenVerify,async (req, res)=>{
    req.id = index.userId
    try{
        const addtodo=await index.todo.create({
            // user_id:req.id,
            title:req.body.title,
            auther:req.body.author,
            image:req.body.image,
            content:req.body.content,
        })
        if(addtodo){
            res.json({
                status:200,
                data:addtodo
            })
        }else{
            res.json({
                status:400,
                message:'todo not added successfully'
            })
        }
    }catch(error){
        console.log("error is /addTodo", error.message)
    } 
})

router.get('/getBlog',tokenVerify,async (req,res)=>{
    try{
           const data= await index.todo.findAll()
           if(data){
            res.json({
                status:200,
                message:'successfully Added',
                data:data
            })
           }else{
            res.json({
                status:404,
                message:'failed to find'
            })
           }
    }catch(err){
        res.json({
            status:500,
            message:'Internal Server Error'
        })
    }
})

router.delete('/deleteBlog/:id',tokenVerify,async (req,res)=>{
    try{
        const data=await index.todo.destroy({
           where:{ id:req.params.id}
        })
        if(data){
            res.json({
                status:200,
                data:data
            })
        }else{
            res.json({
                status:404,
            })
        }
    }catch(err){
      res.json({
        status:500,
        message:'internal server error',
        error:err.message
      })
    }
})

router.put('/updateBlog/:id',tokenVerify,async(req,res)=>{
    console.log(req.headers)
    try{
        const data=await index.todo.update({
            title:req.body.title1,
            auther:req.body.author1,
            image:req.body.image1,
            content:req.body.content1,
        },{where:{id:req.params.id}})
        if(data){
            res.json({
                status:200,
                data:data
            })
        }else{
            res.json({
                status:404,
            })
        }
    }catch(err){
        res.json({
            status:500,
            message:'internal server error',
            error:err.message
          })
    }
})

module.exports = router