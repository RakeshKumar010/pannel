const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/create-product", createProduct);

 
router.get("/get-all-products", getAllProducts);

 
router.get("/get-product-by-id/:id", getProductById);
 
router.put("/update-product/:id", updateProduct);

 
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
