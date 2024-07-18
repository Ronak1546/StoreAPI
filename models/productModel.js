import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    name:
    {
        type:String,
        required:[true,"please enter the product name"],
        trim:true,
        default:true

    },
    price:
    {
        type:Number,
        required:[true,"please enter the product price"],
        default:true

    },
    company:
    {
        type:String,
        enum:{
            values:['ikea','nilkamal','pepperfry','durian'],
            message:'{VALUE} not supported as company name'
            
        }
    },
    rating:{
        type:Number,
        default:4.5
    },
    featured:
    {
        type:Boolean,
        default:false

    },
    createdAt:
    {
        type:Date,
        default:Date.now(),
    },



}
);
export const Product = mongoose.model('Product',productSchema)