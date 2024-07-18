import express from 'express'
import { getAllProduct, getAllProductTest } from '../controllers/productController.js';
const productRoutes= express.Router();
productRoutes.get("/",getAllProduct);
productRoutes.get("/test",getAllProductTest);
export default productRoutes;
