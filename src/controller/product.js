const Product=require('../models/Product')

// create product
const createProduct=async(req,res)=>{
    try {
        const product=await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}
const updateProduct=async(req,res)=>{
    try {
   const product=await Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})  
    res.status(200).json({Product})
} catch (error) {
   res.status(400).json('bad request')     
    }
}
//delet product
const deleteProduct=async(req,res)=>{
    try {
        await product.findByIdAndDelete(req.params.id) 
        res.status(200).json('Product has been deleted')
    } catch (error) {
      return res.status(500).json(error)  
    }
 
}
const getProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id)
       res.status(200).json(product)
        res.status(200).json({others})   
    }
  catch(err){
    res.status(500).json('Product with that id is exist')
  }
}
const getAll=async(req,res)=>{
    const qNew=req.query.new
    const qCategory=req.query.category
    try {
    let products
    if(qNew){
       products=await Product.find().sort({createdAt:-1}).limit(1)
    }else if(qCategory){
        products=await Product.find({categories:{
        $in:[qCategory]
    },
    })
    }else{
        products=await Product.find()
    }
     
      res.status(200).json({products}) 
    } catch (error) {
        res.status(500).send()
    }
}


module.exports={updateProduct,
deleteProduct,getProduct,getAll,createProduct}
