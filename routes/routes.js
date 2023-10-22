//----------------------------------------------------------------------------------------->
//----------------------------Esau Maldonado Aguiar 301267933------------------------------>
//----------------------------------------------------------------------------------------->

const express = require('express');
const router = express.Router();
const product = require('../models/products');


router.get('/products', async (req, res) => {
  try {
    const filters = req.query;
    if (filters.name) {
      filters.name = { $regex: new RegExp(filters.name, 'i') };
    }
    if (Object.keys(filters).length > 0) {
      const filteredProducts = await product.find(filters);
      res.json(filteredProducts);
    } else {
      const allProducts = await product.find();
      res.json(allProducts);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const foundProduct = await product.findById(productId);

    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(foundProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching product by ID' });
  }
});

router.post('/products', async (req, res) => {
  const data = new product({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    const savedData = await data.save();
    res.status(201).json(savedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving to the database' });
  }
});

router.put('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name: req.body.name,
          category: req.body.category,
          quantity: req.body.quantity,
          price: req.body.price,
          description: req.body.description,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating product by ID' });
  }
});



router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product by ID' });
  }
});

router.delete('/products', async (req, res) => {
  try {
    const deletedProducts = await product.deleteMany({});

    res.json({ message: 'All products deleted successfully', deletedCount: deletedProducts.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting all products' });
  }
});



module.exports = router;
