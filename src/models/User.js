const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true

    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
userSchema.pre('save',async function(next){
const salt= await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt)
next()
})
userSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,username:this.username},process.env.JWT_SECRETE,{expiresIn:process.env.JWT_LIFETIME})
}
userSchema.methods.comparePassword=async function(canditatePassword){
    const isMatch=await bcrypt.compare(canditatePassword,this.password)
    return isMatch
}
module.exports=mongoose.model('User',userSchema)