require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const uri = process.env.MONGODB_URI; // Using environment variable for MongoDB URI
let client;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

app.get('/', (req, res) => {
  res.sendFile('index.html'); // Ensure 'index.html' is accessible
});

app.get('/ejs', (req, res) => {
  res.render('index', {
    myServerVariable: "something from server"
  });
});

app.get('/read', async (req, res) => {
  try {
    const collection = client.db("Mohammed-db").collection("whatever-collection");
    const result = await collection.find({}).toArray();
    res.render('mongo', { postData: result });
  } catch (error) {
    console.error("Error reading from database:", error);
    res.status(500).send("Error reading from database.");
  }
});

app.post('/insert', async (req, res) => {
  try {
    const collection = client.db("Mohammeds-db").collection("whatever-collection");
    await collection.insertOne({ post: 'hardcoded post insert ' });
    res.redirect('/read');
  } catch (error) {
    console.error("Error inserting into database:", error);
    res.status(500).send("Error inserting into database.");
  }
});

app.post('/update/:id', async (req, res) => {
  try {
    const collection = client.db("barrys-db").collection("whatever-collection");
    await collection.findOneAndUpdate(
      { "_id": new ObjectId(req.params.id) },
      { $set: { "post": "NEW POST" } }
    );
    res.redirect('/read');
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).send("Error updating document.");
  }
});

app.post('/delete/:id', async (req, res) => {
  try {
    const collection = client.db("Mohammed-db").collection("whatever-collection");
    await collection.findOneAndDelete({ "_id": new ObjectId(req.params.id) });
    res.redirect('/read');
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send("Error deleting document.");
  }
});

app.listen(5500, () => {
  console.log('Server is running on http://localhost:5500');
});
