import express, { response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.route.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'

dotenv.config()
const app = express()
    app.use(cors({
        credentials : true,
        origin : process.env.FRONTEND_URL
    }))
    
app.use(express.json())   
app.use(cookieParser()) 
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = process.env.PORT 
 console.log("process.env.PORT",process.env.PORT);
 
app.get('/', (req, res) =>{
    //server to client
    res.json({
        message : "server is running " + PORT,
    })
})


app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/subcategory',subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is listening on http://0.0.0.0:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Database connection failed:", err);
  process.exit(1);
});
