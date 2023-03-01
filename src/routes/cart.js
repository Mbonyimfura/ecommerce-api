router=require('express').Router()

const {updateCart,deleteCart,getAll,getCart,createCart}=require('../controller/cart')


router.patch('/update/:id',updateCart)
router.delete('/delete/:id',deleteCart)
 router.get('/',getAll)
router.get('/get/:userId',getCart)

router.post('/',createCart)


module.exports=router