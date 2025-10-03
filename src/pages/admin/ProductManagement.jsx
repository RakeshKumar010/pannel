// src/pages/admin/ProductManagement.jsx
import AdminSidebar from '../../components/global/admin/AdminSidebar';
import { Edit, Trash2, Package, Star, Tag } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';

const ProductManagement = () => {
 // Enhanced Dummy product data based on Dmart listings
 const [products, setProducts] = useState([
   { 
    id: 1, 
    name: "Dmart Combo: Atta, Besan, Sugar, Mustard Oil (5kg+1kg+5kg+1L)", 
    price: 499, // Sale Price
    mrp: 1099, // Original Price
    discountPercent: 55, // Calculated
    stock: 15, 
    rating: 5, 
    reviews: 2165 
   },
   { 
    id: 2, 
    name: "1kg Kaju and 1kg Badam Combo Offer", 
    price: 299, 
    mrp: 899,
    discountPercent: 67, // Calculated
    stock: 30, 
    rating: 5, 
    reviews: 956
   },
 ]);

 // Mock state for new product input
 const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    mrp: '',
    discountPercent: 0, // Will be calculated
    stock: 0,
    rating: 5,
    reviews: 0,
 });

 // Function to calculate discount percentage
 const calculateDiscount = useCallback((price, mrp) => {
    if (mrp > 0 && mrp > price) {
        const discount = ((mrp - price) / mrp) * 100;
        return Math.round(discount);
    }
    return 0;
}, []);

 const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? '' : parseFloat(value);
    
    setNewProduct(prev => {
        const updatedProduct = { ...prev, [name]: numericValue };
        
        // Auto-calculate discount when price or mrp changes
        const price = name === 'price' ? numericValue : prev.price;
        const mrp = name === 'mrp' ? numericValue : prev.mrp;
        
        const calculatedDiscount = calculateDiscount(price, mrp);
        
        return {
            ...updatedProduct,
            discountPercent: calculatedDiscount
        };
    });
 };
 
 // Mock handlers for actions
 const handleEdit = (id) => console.log(`Edit product ${id}`);
 const handleDelete = (id) => setProducts(products.filter(p => p.id !== id));
 
 const handleAddProduct = (e) => {
    e.preventDefault();
    
    if (!newProduct.name || newProduct.price === '' || newProduct.mrp === '') {
        alert("Please fill out all required fields: Name, Sale Price, and MRP.");
        return;
    }
    
    console.log("Adding new product:", newProduct);

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    setProducts(prev => [
        ...prev,
        { ...newProduct, id: newId, stock: newProduct.stock || 0 }
    ]);
    
    // Reset form after adding
    setNewProduct({
        name: '', price: '', mrp: '', discountPercent: 0, stock: 0, 
        rating: 5, reviews: 0, 
    });
 };

 return (
  <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 sm:ml-64">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-5">
                <Package size={28} className="text-teal-600 mr-1" />
             Product Management
          </h1>

          {/* Product Table (Kept for continuity) */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Product Inventory ({products.length})</h2>
          <div className="overflow-x-auto rounded-lg border">
            <div className="w-full grid grid-cols-[60px_1fr_100px_100px_100px_100px_100px_100px] gap-4 py-3 px-4 bg-gray-100 text-gray-600 font-bold text-sm border-b">
              <div>ID</div>
              <div>Product Name</div>
              <div className="text-right">Price (Sale)</div>
              <div className="text-right">MRP</div>
              <div className="text-center">Discount %</div>
              <div className="text-center">Stock</div>
              <div className="text-center">Rating</div>
              <div className="text-center">Actions</div>
            </div>
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`w-full grid grid-cols-[60px_1fr_100px_100px_100px_100px_100px_100px] gap-4 items-center py-4 px-4 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}
              >
                <div className="font-medium text-gray-600">{product.id}</div>
                <div className="font-semibold text-gray-800 truncate" title={product.name}>{product.name}</div>
                <div className="text-right font-bold text-teal-700">₹{product.price}</div>
                <div className="text-right font-medium text-gray-500 line-through">₹{product.mrp}</div>
                <div className="text-center">
                    <span className="py-1 px-2 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                        {product.discountPercent}%
                    </span>
                </div>
                <div className={`text-center font-bold ${product.stock < 20 ? 'text-red-500' : 'text-gray-700'}`}>{product.stock}</div>
                <div className="text-center flex items-center justify-center space-x-1 text-amber-500">
                    <Star size={14} className="fill-current" />
                    <span className="text-gray-700 text-xs font-semibold">{product.rating}</span>
                </div>
                <div className="text-center space-x-2">
                  <button onClick={() => handleEdit(product.id)} className="text-blue-500 hover:text-blue-700 p-1 rounded transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 p-1 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Product Form */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center space-x-2">
                <Tag size={20} className="text-teal-600" />
              Add New Product
            </h3>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-6">
              
              {/* Row 1: Name, Prices, Discount (Removed Description/Category/Stock) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handlePriceChange} // Reusing handler as it also updates state
                    placeholder="e.g., 1kg Kaju and 1kg Badam Combo"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-sm"
                    required
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handlePriceChange}
                    placeholder="299"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-sm"
                    required
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    name="mrp"
                    value={newProduct.mrp}
                    onChange={handlePriceChange}
                    placeholder="899"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Auto-calculated Discount, Rating and Reviews (Stock removed) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="text"
                    name="discountPercent"
                    value={newProduct.discountPercent}
                    readOnly // Made Read-Only
                    placeholder="0"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 shadow-inner cursor-not-allowed"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    name="rating"
                    value={newProduct.rating}
                    onChange={handlePriceChange}
                    placeholder="5"
                    min="1"
                    max="5"
                    step="0.5"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-sm"
                    required
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
                  <input
                    type="number"
                    name="reviews"
                    value={newProduct.reviews}
                    onChange={handlePriceChange}
                    placeholder="956"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-sm"
                    required
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock (Optional)</label>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handlePriceChange}
                    placeholder="30"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 self-start"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
  </div>
  );
};

export default ProductManagement;