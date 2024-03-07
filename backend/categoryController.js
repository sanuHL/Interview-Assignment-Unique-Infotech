const db = require('./db');

exports.getAllCategories = (req, res) => {
  
  console.log("aa", req.body);
    db.query('SELECT * FROM categories', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
};

exports.addCategory = (req, res) => {
    const { categoryName, categoryDescription } = req.body;
    db.query('INSERT INTO categories (name, description) VALUES (?, ?)', [categoryName, categoryDescription], (err, result) => {
        if (err) throw err;
        res.send('Category added successfully.');
    });
};

exports.updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { categoryName, categoryDescription } = req.body;
  db.query('UPDATE categories SET name=?, description=? WHERE categoryId=?', [categoryName, categoryDescription, categoryId], (err, result) => {
      if (err) throw err;
      res.send('Category updated successfully.');
  });
};

exports.viewCategory = (req, res) => {
  const categoryId = req.params.id;
  db.query('SELECT * FROM categories WHERE categoryId=?', [categoryId], (err, result) => {
      if (err) throw err;
      res.send(result[0]);
  });
};

exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id;
  db.query('DELETE FROM categories WHERE categoryId=?', [categoryId], (err, result) => {
      if (err) throw err;
      res.send('Category deleted successfully.');
  });
};

// Implement update, view, and delete functionalities similarly
