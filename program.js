const router = require('express').Router();
let index=require('./server')
var nodemailer = require('nodemailer');


router.get('/sendMail',(req,res)=>{
    var transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port:587,
        secure:false,
        auth: {
            type: 'OAuth2',
            user: 'zaynmalik111298@gmail.com',
            pass: 'Pa$$W0rd9812',
            clientId: '818686816195-20m0ipr08ck1omhedhis9v6menqs5vro.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//044w4SsADsnUoCgYIARAAGAQSNwF-L9Ir_IKlYgXOYPJK-KxD-oWPUfLCDljQGLrxKMD_JRfkmwLrjDQkq_ElUEi8JHDcfNTZl-A'
        }
      });
      
      var mailOptions = {
        from: 'zaynmalik111298@gmail.com',
        to: 'luqman@edulab.in',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.json({
             status:404,
             message:error.message
          })
        } else {
         res.json(info);
        }
      });
})

module.exports=router