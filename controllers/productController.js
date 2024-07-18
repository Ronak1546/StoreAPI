import { Product } from "../models/productModel.js";

export const getAllProduct =async(req,res)=>
{
    //const products = await Product.find(req.query);
    console.log(req.query);
    const {featured,company,rating,name,sort,fields,limits,pages,numericFilters}=req.query;
    const myQuery={};
    if(featured){
        myQuery.featured= featured==='true';

    }
    console.log(myQuery);
    if(company){
        myQuery.company={$regex:company,$options:"i"};
    }
    if(rating)
        {
        myQuery.rating= Number(rating);

    }
    if(name)
    {
        myQuery.name={$regex:name,$options:"i"};

    }
    //numeric filter
if(numericFilters)
    {
        const operatorMap={
            ">":"$gt",
            "<":"$gte",
            "=":"$eq",
            '>=':'$gte',
            '<=':'$lte'
        
        };
        const regEx= /\b(<|<=|>|>=|=)\b/g;
        let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
        console.log(filters);
        const options=["price","rating"];
        filters=filters.split(",").forEach((item) =>
        {
            const[field,operator,value]=item.split("-");
            if(options.includes(field))
            {
                myQuery[field]={...myQuery[field],[operator]:Number(value)};
            }
        });
    }
    let results = Product.find(myQuery);
    if(sort){
        let sortByfields=sort.split(",");
        //console.log("request  from req.query",sortByfields);

        sortByfields=sortByfields.map((field)=>{
            return field.trim();
        });
        sortByfields=sortByfields.join(" ");//converted into string separated by space
        results=results.sort(sortByfields);
    }
    else{
        results=results.sort("createdAt");

    }
    if(fields)
    {
        let selectedFields=fields.split(',');
        selectedFields=selectedFields.map((fields)=>fields.trim());
        selectedFields=selectedFields.join(" ");
        results=results.select(selectedFields);
    }
    //pagination
    //server se ek bar ma data aana.//limit//skip
   
const pageNo = Number(req.query.page)||1;
const limitValue=Number(req.query.limit)||10;
if(results.length>limitValue)
    {
const skipValue=(pageNo-1)*limitValue;
results=results.skip(skipValue).limit(limitValue);
}



    const products=await results;
    console.log("myQuery:",myQuery);
    //const products = await Product.find(myQuery);
    res.status(200).json({nHits: products.length,products});
   // res.send("get all products");
};
export const getAllProductTest=async(req,res)=>
{
    //const products = await Product.find();
    //const products = await Product.find({name:{$regex:'vase',$options:"i"}});
    //const products = await Product.find(myQuery);
   // res.status(200).json({nHits: products.length,products});
    //const products=await Product.find().sort("price");
    //res.status(200).json({nHits: products.length,products});
    //const products=await Product.find().select("name price rating");
    const products=await Product.find({price:{$gt:30}}).select("name price rating").limit(10).skip(10);
    res.status(200).json({nHits: products.length,products});
    //res.send("get all product tests");
};