const db = require("./db");

exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.addProduct = (req, res) => {
  console.log("ccccc", req.body);
  const {
    categoryId,
    productName,
    productDescription,
    productPrice,
    productQuantity,
  } = req.body;
  db.query(
    "INSERT INTO products (category, name, description, price, quantity) VALUES (?, ?, ?, ?, ?)",
    [
      categoryId,
      productName,
      productDescription,
      productPrice,
      productQuantity,
    ],
    (err, result) => {
      if (err) throw err;
      res.send("Product added successfully.");
    }
  );
};

exports.updateProduct = (req, res) => {
  console.log("sss ",req.body)
  const id = req.params.id;
  const {categoryId, productName, productDescription, productPrice, productQuantity } =
    req.body;
  db.query(
    "UPDATE products SET category=?, name=?, description=?, price=?, quantity=? WHERE id=?",
    [categoryId, productName, productDescription, productPrice, productQuantity, id],
    (err, result) => {
      if (err) throw err;
      res.send("Product updated successfully.");
    }
  );
};

exports.viewProduct = (req, res) => {
  const productId = req.params.id;
  db.query("SELECT * FROM products WHERE id=?", [productId], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  db.query("DELETE FROM products WHERE id=?", [productId], (err, result) => {
    if (err) throw err;
    res.send("Product deleted successfully.");
  });
};
