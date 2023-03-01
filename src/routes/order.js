router=require('express').Router()

const {updateOrder,deleteOrder,getAll,getOrder,createOrder,getIncome}=require('../controller/order')

router.patch('/update/:id',updateOrder)
router.delete('/delete/:id',deleteOrder)
 router.get('/',getAll)
router.get('/get/:userId',getOrder)
router.get('/income',getIncome)

router.post('/',createOrder)


module.exports=router