const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/product.controller");
const router = express.Router();
 

router.post("/create-product", createProduct);

 
router.get("/get-all-products", getAllProducts);

 
router.get("/get-product-by-id/:id", getProductById);
 
router.put("/update-product/:id", updateProduct);

 
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
