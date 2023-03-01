router=require('express').Router()

const {updateUser,deleteUser,getAll,getUser,getUserStat,createProduct}=require('../controller/product')


// router.patch('/update/:id',updateUser)
// router.delete('/delete/:id',deleteUser)
 router.get('/',getAll)
// router.get('/get/:id',getUser)
// router.get('/stats',getUserStat)
router.post('/',createProduct)


module.exports=router