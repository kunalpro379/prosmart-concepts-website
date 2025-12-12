import { MongoClient } from 'mongodb';

const MONGO_URI = "mongodb+srv://prosmart:prosmart@cluster0.jokss9k.mongodb.net/?appName=Cluster0";
const DATABASE_NAME = "prosmart_db";

let db = null;
let client = null;

export const connectDB = async () => {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    db = client.db(DATABASE_NAME);
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
    db = null;
    client = null;
  }
};

export default { connectDB, getDB, closeDB };

