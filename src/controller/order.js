const Order=require('../models/Order')

// create Order
const createOrder=async(req,res)=>{
    try {
        const order=await Order.create(req.body)
        res.status(201).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
}
const updateOrder=async(req,res)=>{
    try {
   const order=await Order.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})  
    res.status(200).json({order})
} catch (error) {
   res.status(400).json('bad request')     
    }
}
//delet Order
const deleteOrder=async(req,res)=>{
    try {
        await order.findByIdAndDelete(req.params.id) 
        res.status(200).json('Order has been deleted')
    } catch (error) {
      return res.status(500).json(error)  
    }
 
}
const getOrder=async(req,res)=>{
    try{
        const order=await Order.find({userId:req.params.userId})
       res.status(200).json(order)
      
    }
  catch(err){
    res.status(500).json('Order with that id is exist')
  }
}
const getAll=async(req,res)=>{
 try {
    const orders=await Order.find()
    res.status(200).json(orders)
 } catch (error) {
    res.status(200).json(error)
 }
}
//get monthly income
const getIncome=async(req,res)=>{
     const date=new Date()
     const lastMonth=new Date(date.setMonth(date.getMonth()-1));
     const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports={updateOrder,
deleteOrder,getOrder,getAll,createOrder,getIncome}
