
const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json('invalid credentials')
    }
    const token=authHeader.split(' ')[1]
    try {
      const payload=jwt.verify(token,process.env.JWT_SECRETE)
      req.user={userId:payload.userId,username:payload.username} 
      next() 
    } catch (error) {
      res.status(400).json('invalid authentication')  
    }
}
const verifyTokenAndAuthorization=async(req,res,next)=>{
    auth(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(401).json('You are not allowed to do that!')
        }
    })
}
module.exports={auth,verifyTokenAndAuthorization}