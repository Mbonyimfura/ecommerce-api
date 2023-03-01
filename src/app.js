const express=require('express')
const app=express()
const connectDB=require('./db/connect')
const dotenv=require('dotenv')
//routes
const {auth}=require('./middleware/auth')
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user')
const productRouter=require('./routes/product')
const cartRouter=require('./routes/cart')
const orderRouter=require('./routes/order')
const stripeRouter=require('./routes/stripe')
dotenv.config()
const port=process.env.PORT 
app.use(express.json())

app.get('/api/test',(req,res)=>{
    res.send('Hello world')
})
//end points
app.use('/api/user',authRouter)
 app.use('/api/users',auth,userRouter)
 app.use('/api/products',auth,productRouter)
 app.use('/api/carts',auth,cartRouter)
 app.use('/api/orders',auth,orderRouter)
 app.use('/api/checkout',stripeRouter)
const start=async()=>{
try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port,()=>{

        console.log(`The server is starting up on port ${port}...`)
    })
} catch (error) {
    console.log(error)
}
}

start()