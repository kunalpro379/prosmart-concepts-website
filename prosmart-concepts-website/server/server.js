import express from 'express';
import cors from 'cors';
import { connectDB, closeDB } from './db.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = 5000;

// Only allow your frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8080',
  'https://prosmart-concepts.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile/postman), or in the list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', productRoutes);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Prosmart API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Prosmart API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      productById: '/api/products/:id',
      categories: '/api/categories',
      categoriesWithProducts: '/api/categories-with-products',
      subcategories: '/api/subcategories'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`API endpoints available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await closeDB();
  process.exit(0);
});

startServer();

