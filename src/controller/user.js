const User=require('../models/User')


const updateUser=async(req,res)=>{
    try {
   const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})  
    res.status(200).json({user})
} catch (error) {
   res.status(400).json('bad request')     
    }
}
const deleteUser=async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id) 
        res.status(200).json('User has been deleted')
    } catch (error) {
      return res.status(500).json(error)  
    }
 
}
const getUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...others}=user._doc
        res.status(200).json({others})   
    }
  catch(err){
    res.status(500).json('user with that id is exist')
  }
}
const getAll=async(req,res)=>{
    try {
      const user=await User.find() 
     
      res.status(200).json({user}) 
    } catch (error) {
        res.status(500).send()
    }
}
//get user stat
getUserStat=async(req,res)=>{
  const date=new Date() 
   const lastYear=new Date(date.setFullYear(date.getFullYear()-1))
  try {
  const data=await User.aggregate([
    {$match:{createdAt:{$gte:lastYear}}},
    {$project:{month:{$month:"$createdAt"},
  },
  },
  {$group:{
    _id:"$month",
    total:{$sum:1},
  }}
  ])
  res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports={updateUser,
deleteUser,getUser,getAll,getUserStat}