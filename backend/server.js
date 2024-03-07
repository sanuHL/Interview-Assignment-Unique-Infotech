const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000; // You can change this port if needed

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes for categories and products
const categoryController = require('./categoryController');
const productController = require('./productController');

app.get('/categories', categoryController.getAllCategories);
app.post('/categories', categoryController.addCategory);
app.put('/categories/:id', categoryController.updateCategory);
app.delete('/categories/:id', categoryController.deleteCategory);

app.get('/products', productController.getAllProducts);
app.post('/products', productController.addProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
