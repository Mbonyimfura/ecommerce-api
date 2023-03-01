const User=require('../models/User')
const register=async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:  req.body.password
      });
    
      try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
}

const login=async(req,res)=>{
    try {
        const {username}=req.body
     const user=await User.findOne({username}) 
     if(!user)return res.status(401).json('Invalid credentials')
     const hashedPassword=  await user.comparePassword(req.body.password)
     if(!hashedPassword)return res.status(401).json('Invalid credentials')
     const token=user.createJWT()
     const {password,...others}=user._doc
    
     res.status(200).json({...others,token})

    } catch (error) {
        res.status(00).json('bad request') 
    }
}
module.exports={
    register,login
}