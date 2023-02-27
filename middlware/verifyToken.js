const jwt = require('jsonwebtoken');

const verifyToken=(req, res, next)=> {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token,"secretkey",(err,token)=>{
        console.log(1)
        if(err){
            res.sendStatus(401)
        }else{
            next();
        }
    })
      
    } else {
      res.sendStatus(403);
    }
}

module.exports=verifyToken;

