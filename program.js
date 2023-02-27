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
            user: 'za878797979111298@gmail.com',
            pass: '76767575776712',
            clientId: '818686816195-20m0i9879798798pr08ck1omhedhis9v6menqs5vro.apps.googleusercontent.com',
            clientSecret: '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DpVljufhuyIn',
            refreshToken: '1//044w4SsADsnUoCgYIARAAGhjekrhgi87t954AQSNwF-L9Ir_IKlYgXOYPJK-KxD-oWPUfLCDljQGLrxKMD_JRfkmwLrjDQkq_ElUEi8JHDcfNTZl-A'
        }
      });
      
      var mailOptions = {
        from: 'zaynmauy8787611298@gmail.com',
        to: '78687687687@edulab.in',
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
