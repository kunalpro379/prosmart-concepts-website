import { MongoClient } from 'mongodb';

const MONGO_URI = "mongodb+srv://prosmart:prosmart@cluster0.jokss9k.mongodb.net/?appName=Cluster0"; // <--- HARDCODED HERE
const DATABASE_NAME = "prosmart_db";

let db = null;
let client = null;

// ... rest of connectDB logic ...


console.log(db);