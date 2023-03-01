const router=require('express').Router()

const {stripePayment}=require('../controller/stripe')

router.post('/payment',stripePayment)


module.exports=router