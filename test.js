const express=require('express');
const router = require('express').Router();
let index=require('./server')



router.post('/addTodo', async (req, res)=>{
    req.id = index.userId
    try{
        const addtodo=await index.todo.create({
            todo:req.body.addtodo,
            user_id:req.id
        })
        console.log(addtodo)
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

module.exports = router