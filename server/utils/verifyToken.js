import Jwt from "jsonwebtoken";

const verifyToken = (req,res,next) =>{
    const  token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({ success : false , message : "you are not authorize"})
    }


    //if token is exits the verify the token
    Jwt.verify(token,process.env.JWT_SECRET_KEY, (error,user)=>{
        if(error){
            return res.status(401).json({ success: false , message : " token is invalid"})  
        }

     req.user = user
     next() //donot forget to call next  
    })
 }

 export const verifyUser = (req, res ,next )=>{
    verifyToken (req,res,next,() => {
        if ( req.user.id === req.params.id || req.user.role === "admin"){
            next();
        }else{
          return  res.status(401).json({ success : false , message : " You are not authenticated"});
        }
    });
 };

 export const verifyAdmin= (req, res ,next )=>{
    verifyToken (req,res,next,() => {
        if ( req.user.role === "admin"){
            next();
        }else{
          return  res.status(401).json({ success : false , message : " You are not authentrize"});
        }
    });
 };