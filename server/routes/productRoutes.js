import express from 'express';
import {
  getAllProducts,
  getProductById,
  getCategoriesWithProducts,
  getCategories,
  getSubcategories
} from '../controllers/productController.js';

const router = express.Router();

// Product routes
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

// Category routes
router.get('/categories', getCategories);
router.get('/categories-with-products', getCategoriesWithProducts);

// Subcategory routes
router.get('/subcategories', getSubcategories);

export default router;

