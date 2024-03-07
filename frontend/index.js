document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display product categories on page load
  fetchProductCategories();

  // Fetch and display products on page load
  fetchProducts();

  // Add event listener for submitting new product form
  const productForm = document.getElementById("productForm");
  productForm.addEventListener("submit", addProduct);

  // Add event listener for submitting new product category form
  const categoryForm = document.getElementById("categoryForm");
  categoryForm.addEventListener("submit", addProductCategory);
});

// Function to fetch and display products
const fetchProducts = () => {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      const productList = document.getElementById("productList");
      productList.innerHTML = "";
      data.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.innerHTML = `
                    <strong>${product.name}</strong> - ${product.description} - Price: ${product.price} - Quantity: ${product.quantity}
                    <button onclick="editProduct(${product.id},'${product.name}','${product.description}',${product.price},${product.quantity})">Edit</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                `;
        productList.appendChild(productItem);
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
};

// Function to add new product
const addProduct = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const categoryId = formData.get("categoryId");
  const productName = formData.get("productName");
  const productDescription = formData.get("productDescription");
  const productPrice = formData.get("productPrice");
  const productQuantity = formData.get("productQuantity");
  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId,
      productName,
      productDescription,
      productPrice,
      productQuantity,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("New product added:", data);
      fetchProducts(); // Refresh the product list
    })
    .catch((error) => console.error("Error adding new product:", error));
};
// Function to edit a product
const editProduct = (id, name, description, price, quantity) => {
  document.getElementById("updateDeleteForm").style.display = "block";
  document.getElementById("updateProductName").value = name;
  document.getElementById("updateProductDescription").value = description;
  document.getElementById("updateProductPrice").value = price;
  document.getElementById("updateProductQuantity").value = quantity;

  document.getElementById("updateProductBtn").onclick = function () {
    const newName = document.getElementById("updateProductName").value;
    const newDescription = document.getElementById(
      "updateProductDescription"
    ).value;
    const newPrice = document.getElementById("updateProductPrice").value;
    const newQuantity = document.getElementById("updateProductQuantity").value;
    updateProduct(id, newName, newDescription, newPrice, newQuantity);
  };

  document.getElementById("deleteProductBtn").onclick = function () {
    deleteProduct(id);
  };

  document.getElementById("cancelUpdateDeleteBtn").onclick = function () {
    document.getElementById("updateDeleteForm").style.display = "none";
  };
};

// Function to update a product
const updateProduct = (id, newName, newDescription, newPrice, newQuantity) => {
  fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName: newName,
      productDescription: newDescription,
      productPrice: newPrice,
      productQuantity: newQuantity,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product updated:", data);
      fetchProducts(); // Refresh the product list
      document.getElementById("updateDeleteForm").style.display = "none";
    })
    .catch((error) => console.error("Error updating product:", error));
};

// Function to delete a product
const deleteProduct = (id) => {
  fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product deleted:", data);
      fetchProducts(); // Refresh the product list
    })
    .catch((error) => console.error("Error deleting product:", error));
};

// Function to fetch and display product categories
const fetchProductCategories = () => {
  fetch("http://localhost:3000/categories")
    .then((response) => response.json())
    .then((data) => {
      const categoryList = document.getElementById("categoryList");
      categoryList.innerHTML = "";
      data.forEach((category) => {
        const categoryItem = document.createElement("div");
        categoryItem.innerHTML = `
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                    <button onclick="editCategory(${category.categoryId},'${category.name}','${category.description}')">Edit</button>
                    <button onclick="deleteCategory(${category.id})">Delete</button>
                `;
        categoryList.appendChild(categoryItem);
      });
    })
    .catch((error) =>
      console.error("Error fetching product categories:", error)
    );
};

// Function to add new product category
const addProductCategory = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const categoryName = formData.get("categoryName");
  const categoryDescription = formData.get("categoryDescription");
  fetch("http://localhost:3000/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryName, categoryDescription }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("New category added:", data);
      fetchProductCategories(); // Refresh the category list
    })
    .catch((error) => console.error("Error adding new category:", error));
};

// Function to edit a category
const editCategory = (id, name, description) => {
  document.getElementById("updateDeleteForm").style.display = "block";
  document.getElementById("updateCategoryName").value = name;
  document.getElementById("updateCategoryDescription").value = description;

  document.getElementById("updateCategoryBtn").onclick = function () {
    const newName = document.getElementById("updateCategoryName").value;
    const newDescription = document.getElementById(
      "updateCategoryDescription"
    ).value;
    updateProductCategory(id, newName, newDescription);
  };

  document.getElementById("deleteCategoryBtn").onclick = function () {
    deleteProductCategory(id);
  };

  document.getElementById("cancelUpdateDeleteBtn").onclick = function () {
    document.getElementById("updateDeleteForm").style.display = "none";
  };
};

// Function to update a product category
const updateProductCategory = (categoryId, newName, newDescription) => {
  fetch(`http://localhost:3000/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryName: newName,
      categoryDescription: newDescription,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Category updated:", data);
      fetchProductCategories(); // Refresh the category list
      document.getElementById("updateDeleteForm").style.display = "none";
    })
    .catch((error) => console.error("Error updating category:", error));
};

// Function to delete a product category
const deleteProductCategory = (categoryId) => {
  fetch(`http://localhost:3000/categories/${categoryId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Category deleted:", data);
      fetchProductCategories(); // Refresh the category list
      document.getElementById("updateDeleteForm").style.display = "none";
    })
    .catch((error) => console.error("Error deleting category:", error));
};
