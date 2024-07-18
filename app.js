import express from "express";
import "dotenv/config";
import cors from 'cors'
import dbConnect from "./dbConnect.js";
import productRoutes from "./routes/productRoutes.js";
import 'express-async-error';
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/errorHandler.js";
const app=express();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>
    {
        res.send("<h1>Store API</h1>");
    });
    app.use("/api/v1/products",productRoutes);
    app.use(notFound);
    app.use(errorHandler)
   
;(async()=>{
    try {
            
            await dbConnect(process.env.MONGO_URL)
            console.log("database connected successfully...")
            app.listen(port,console.log(`Server is running at port ${port}`));
        }
     catch (error) {
        console.log("error in db connect ...");
        
    }
}
)();