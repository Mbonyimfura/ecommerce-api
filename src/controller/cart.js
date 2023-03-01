const Cart=require('../models/Cart')

// create cart
const createCart=async(req,res)=>{
    try {
        const cart=await Cart.create(req.body)
        res.status(201).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
}
const updateCart=async(req,res)=>{
    try {
   const Cart=await Cart.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})  
    res.status(200).json({Cart})
} catch (error) {
   res.status(400).json('bad request')     
    }
}
//delet Cart
const deleteCart=async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id) 
        res.status(200).json('Cart has been deleted')
    } catch (error) {
      return res.status(500).json(error)  
    }
 
}
const getCart=async(req,res)=>{
    try{
        const cart=await Cart.findOne({userId:req.params.userId})
       res.status(200).json(cart)
      
    }
  catch(err){
    res.status(500).json('Cart with that id is exist')
  }
}
const getAll=async(req,res)=>{
 try {
    const carts=await Cart.find()
    res.status(200).json(carts)
 } catch (error) {
    res.status(200).json(error)
 }
}


module.exports={updateCart,
deleteCart,getCart,getAll,createCart}
