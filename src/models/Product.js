const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true

    },
  desc:{
        type:String,
        trim:true,

    },
   img:{
        type:String,
      
    },
   categories:{
        type:Array,
        required:true
    },
   price:{
        type:String,
        required:true
    },
    color:{
        type:String,
    
    },
   size:{
        type:String,
       
    },

},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)