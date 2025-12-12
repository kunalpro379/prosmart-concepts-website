# Prosmart Server API

Backend API for Prosmart Skyline application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
MONGO_URI=mongodb+srv://prosmart:prosmart@cluster0.jokss9k.mongodb.net/?appName=Cluster0
DATABASE_NAME=prosmart_db
PORT=5000
```

3. Start the server:

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filters: category_id, subcategory_id, main_category)
- `GET /api/products/:id` - Get product by ID

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories-with-products` - Get categories with nested subcategories and products
- `GET /api/subcategories` - Get all subcategories (optional filter: category_id)

### Health Check
- `GET /health` - Check API status

## Project Structure

```
server/
├── controllers/
│   └── productController.js    # Business logic for products
├── routes/
│   └── productRoutes.js        # API route definitions
├── db.js                        # MongoDB connection handler
├── server.js                    # Main application entry point
├── package.json
├── .env
└── README.md
```

## MongoDB Collections

- **Products**: Product information with references to categories and subcategories
- **Categories**: Product categories with main_category grouping
- **SubCategories**: Subcategories linked to categories

