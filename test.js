const express=require('express');
const router = require('express').Router();
let server=require('./server')


router.post('/addTodo', function(req, res){
    console.log("userid",server.userId)
    console.log(req.body)
})

module.exports = router