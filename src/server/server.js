const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('./db'); // Import the db module

const app = express();

// Enable CORS for specified origins
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY; // Use an environment variable for the secret key

// Middleware to authenticate using JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Middleware to check user roles
const roleRequired = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (user && roles.includes(user.userType)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};

// Route to create a new product
app.post('/api/v1/products', [
  authenticateJWT,
  roleRequired(['admin']),
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('category').isString().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, category, imageUrl, stock } = req.body;
  try {
    const result = await db.createProduct({ name, description, price, category, imageUrl, stock });
    res.json({ message: 'Product created successfully', productId: result.insertId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Route to fetch all products
app.get('/api/v1/products', async (req, res) => {
  try {
    const products = await db.getAllProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
