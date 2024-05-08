const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.auth;
    if(authHeader){
      const token = authHeader;
      jwt.verify(token,Secret ,(err,user)=>{
        if(err){
          return res.status(403);
        }
        req.user = user;
        next();
      })
    }else{
      res.status(403);
    }
} 

module.exports = auth;