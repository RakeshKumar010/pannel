const Product = require("../models/Product");
const ApiResponse = require("../utils/ApiResponse"); // Assumed utility
const ApiError = require("../utils/ApiError");     // Assumed utility

/**
 * Utility function to calculate the discount percentage.
 * @param {number} price - Sale price.
 * @param {number} mrp - Maximum Retail Price.
 * @returns {number} Rounded discount percentage.
 */
const calculateDiscountPercent = (price, mrp) => {
    const safeMrp = Number(mrp);
    const safePrice = Number(price);

    if (safeMrp > 0 && safeMrp > safePrice) {
        const discount = ((safeMrp - safePrice) / safeMrp) * 100;
        return Math.round(discount);
    }
    return 0;
};

// --- 1. Create Product ---
const createProduct = async (req, res, next) => {
    try {
        const { name, price, mrp, stock, rating, reviews } = req.body;

        // Basic validation check
        if (!name || !price || !mrp) {
            return next(new ApiError("Product name, price, and MRP are required fields.", 400));
        }

        // Auto-calculate discount percentage
        const discountPercent = calculateDiscountPercent(price, mrp);

        const newProduct = new Product({
            name,
            price,
            mrp,
            discountPercent, // Save calculated discount
            stock: stock || 0,
            rating: rating || 0,
            reviews: reviews || 0,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(
            new ApiResponse(201, "Product created successfully", savedProduct)
        );
    } catch (error) {
        // Handle MongoDB validation errors (e.g., min/max constraints)
        if (error.name === 'ValidationError') {
            return next(new ApiError(error.message, 400));
        }
        next(error);
    }
};

// --- 2. Get All Products ---
const getAllProducts = async (req, res, next) => {
    try {
        // Find all products (no soft delete field assumed for simplicity)
        const products = await Product.find({});

        if (products.length === 0) {
            // Returning 200 with an empty array is also acceptable for lists
            return res.status(200).json(new ApiResponse(200, "No products found", []));
        }

        res.status(200).json(new ApiResponse(200, "Products fetched successfully", products));
    } catch (error) {
        next(error);
    }
};

// --- 3. Get Product by ID ---
const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ApiError(`Product with ID ${productId} not found`, 404));
        }

        res.status(200).json(new ApiResponse(200, "Product fetched successfully", product));
    } catch (error) {
        // Handle invalid MongoDB ID format
        if (error.name === 'CastError') {
            return next(new ApiError("Invalid Product ID format", 400));
        }
        next(error);
    }
};

// --- 4. Update Product ---
const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updates = req.body;

        // Recalculate discount if price or mrp is being updated
        if (updates.price !== undefined || updates.mrp !== undefined) {
            // Fetch current product to get existing price/mrp if one is missing in updates
            const currentProduct = await Product.findById(productId);
            if (!currentProduct) return next(new ApiError(`Product with ID ${productId} not found`, 404));
            
            const newPrice = updates.price !== undefined ? updates.price : currentProduct.price;
            const newMrp = updates.mrp !== undefined ? updates.mrp : currentProduct.mrp;
            
            updates.discountPercent = calculateDiscountPercent(newPrice, newMrp);
        }

        // Find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { ...updates, updatedAt: Date.now() },
            { new: true, runValidators: true } // 'new: true' returns the updated document; 'runValidators: true' applies schema validation
        );

        if (!updatedProduct) {
            return next(new ApiError(`Product with ID ${productId} not found`, 404));
        }

        res.status(200).json(new ApiResponse(200, "Product updated successfully", updatedProduct));
    } catch (error) {
        if (error.name === 'CastError') {
            return next(new ApiError("Invalid Product ID format", 400));
        }
        if (error.name === 'ValidationError') {
            return next(new ApiError(error.message, 400));
        }
        next(error);
    }
};

// --- 5. Delete Product (Hard Delete) ---
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return next(new ApiError(`Product with ID ${productId} not found`, 404));
        }

        res.status(200).json(
            new ApiResponse(200, "Product deleted successfully", { deletedId: productId })
        );
    } catch (error) {
        if (error.name === 'CastError') {
            return next(new ApiError("Invalid Product ID format", 400));
        }
        next(error);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};