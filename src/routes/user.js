router=require('express').Router()

const {updateUser,deleteUser,getAll,getUser,getUserStat}=require('../controller/user')


router.patch('/update/:id',updateUser)
router.delete('/delete/:id',deleteUser)
router.get('/',getAll)
router.get('/get/:id',getUser)
router.get('/stats',getUserStat)


module.exports=router