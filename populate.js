import dbConnect from "./dbConnect.js";
import 'dotenv/config';
import { Product } from "./models/productModel.js";
import productData from "./products.json" assert {type:"json" };//file type batata hai assert

//database connectivity and insertion of records and then close.
;(async()=>
{
try {
    await dbConnect(process.env.MONGO_URL)
    console.log("database connected sucessfully...");
    await Product.deleteMany()
    console.log('all records deleted');
    await Product.create(productData)
    console.log('product data imported...');
    process.exit(0);
    //normal termination
    
} catch (error) {
    console.log(error);
    process.exit(1);
    //abnormal termination..
    
}
})();