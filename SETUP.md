# Prosmart Skyline Clone - Setup Guide

This project consists of a React frontend and an Express backend that connects to MongoDB.

## Project Structure

```
prosmart-skyline-clone/
├── src/                          # Frontend React application
│   ├── components/
│   │   ├── products/            # Product-related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── ProductsHeader.tsx
│   │   ├── home/                # Home page components
│   │   ├── layout/              # Layout components
│   │   └── ui/                  # Reusable UI components
│   ├── pages/
│   │   ├── Index.tsx            # Home page
│   │   ├── Products.tsx         # Products page (fetches from API)
│   │   ├── ProductDetail.tsx
│   │   └── NotFound.tsx
│   ├── services/
│   │   └── api.ts               # API service functions
│   ├── types/
│   │   └── product.ts           # TypeScript types
│   └── ...
├── server/                       # Backend Express API
│   ├── controllers/
│   │   └── productController.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── db.js                    # MongoDB connection
│   ├── server.js                # Express server entry point
│   ├── package.json
│   └── .env
└── ...
```

## Prerequisites

- Node.js (v18 or higher)
- npm or bun
- MongoDB Atlas account (or local MongoDB instance)

## Setup Instructions

### 1. Frontend Setup

1. Install dependencies:
```bash
npm install
# or
bun install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in terminal).

### 2. Backend Setup

1. Navigate to the server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file should already exist with:
```env
MONGO_URI=mongodb+srv://prosmart:prosmart@cluster0.jokss9k.mongodb.net/?appName=Cluster0
DATABASE_NAME=prosmart_db
PORT=5000
```

4. Start the server:

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:5000`.

### 3. Database Setup

The MongoDB database should already be populated with products from the `prosmart_products.json` file using the Python script.

If you need to populate the database again:

```bash
cd src/DB
python mongo.py
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
  - Query params: `category_id`, `subcategory_id`, `main_category`
- `GET /api/products/:id` - Get product by ID

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories-with-products` - Get categories with nested subcategories and products
- `GET /api/subcategories` - Get all subcategories
  - Query params: `category_id`

### Health Check
- `GET /health` - Check API status
- `GET /` - API information

## Running the Full Stack

### Option 1: Two Terminal Windows

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
cd server
npm run dev
```

### Option 2: Using a Process Manager (Recommended)

You can use `concurrently` to run both servers:

1. Install concurrently in the root:
```bash
npm install --save-dev concurrently
```

2. Add this script to the root `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev\" \"cd server && npm run dev\"",
    "dev:frontend": "npm run dev",
    "dev:backend": "cd server && npm run dev"
  }
}
```

3. Run both servers:
```bash
npm run dev
```

## Features

### Products Page
- ✅ Fetches products from MongoDB via Express API
- ✅ Category and subcategory filtering
- ✅ Price range filtering (UI ready, backend can be extended)
- ✅ Responsive grid layout (1-4 columns based on screen size)
- ✅ Loading and error states
- ✅ Beautiful animations with Framer Motion
- ✅ Custom scrollbars
- ✅ Product cards with images, pricing, and ratings

### Backend API
- ✅ RESTful API design
- ✅ MongoDB integration
- ✅ Proper error handling
- ✅ CORS enabled for frontend
- ✅ Modular architecture (controllers, routes, db)
- ✅ Environment variable configuration

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Shadcn UI Components

### Backend
- Node.js
- Express.js
- MongoDB (via MongoDB Node.js Driver)
- CORS
- dotenv

## Troubleshooting

### Frontend can't connect to backend
- Make sure the backend server is running on port 5000
- Check that `VITE_API_URL` in `.env` is set correctly
- Verify CORS is enabled in the backend

### Database connection issues
- Verify MongoDB URI is correct in `server/.env`
- Check your network connection
- Ensure MongoDB Atlas allows connections from your IP

### Port already in use
- Change the PORT in `server/.env`
- Update `VITE_API_URL` in the frontend `.env` to match

## Development Tips

1. **Hot Reload**: Both frontend and backend have hot reload enabled in development mode
2. **API Testing**: Use the `/health` endpoint to verify the backend is running
3. **Database Inspection**: Use MongoDB Compass or the Atlas web interface to view data
4. **Console Logs**: Check browser console for frontend errors and terminal for backend errors

## Next Steps

- [ ] Add product search functionality
- [ ] Implement price filtering on backend
- [ ] Add pagination for large product lists
- [ ] Implement shopping cart functionality
- [ ] Add user authentication
- [ ] Create admin panel for product management

