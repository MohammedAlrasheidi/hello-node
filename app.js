require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const mongoApiUrl = "https://us-east-2.aws.data.mongodb-api.com/app/data-inolzhb/endpoint/data/v1/action/";
const apiKey = process.env.MONGO_API_KEY; 4mVajl7Bh3ADTzTK8uLQWunGP3Ke3bdegBEFMTwAhajcNyfRlDoLbH07G23NeWgZ

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test connection
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/ejs', (req, res) => {
  res.render('index', { myServerVariable: "something from server" });
});

// Read all documents from the collection
app.get('/read', async (req, res) => {
  try {
    const response = await axios.post(`${mongoApiUrl}find`, {
      collection: "whatever-collection",  // Replace with your collection name
      database: "Mohammed-db",  // Replace with your database name
      dataSource: "Cluster0"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });

    const result = response.data;
    res.render('mongo', { postData: result.documents });
  } catch (error) {
    console.error("Error reading from database:", error);
    res.status(500).send("Error reading from database.");
  }
});

// Insert a document into the collection
app.post('/insert', async (req, res) => {
  try {
    await axios.post(`${mongoApiUrl}insertOne`, {
      collection: "whatever-collection",  // Replace with your collection name
      database: "Mohammeds-db",  // Replace with your database name
      dataSource: "Cluster0",
      document: { post: 'hardcoded post insert' }  // Replace with your data
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });

    res.redirect('/read');
  } catch (error) {
    console.error("Error inserting into database:", error);
    res.status(500).send("Error inserting into database.");
  }
});

// Update a document in the collection
app.post('/update/:id', async (req, res) => {
  try {
    await axios.post(`${mongoApiUrl}updateOne`, {
      collection: "whatever-collection",  // Replace with your collection name
      database: "barrys-db",  // Replace with your database name
      dataSource: "Cluster0",
      filter: { "_id": { "$oid": req.params.id } },
      update: { "$set": { "post": "NEW POST" } }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });

    res.redirect('/read');
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).send("Error updating document.");
  }
});

// Delete a document from the collection
app.post('/delete/:id', async (req, res) => {
  try {
    await axios.post(`${mongoApiUrl}deleteOne`, {
      collection: "whatever-collection",  // Replace with your collection name
      database: "Mohammed-db",  // Replace with your database name
      dataSource: "Cluster0",
      filter: { "_id": { "$oid": req.params.id } }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });

    res.redirect('/read');
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send("Error deleting document.");
  }
});

app.listen(5500, () => {
  console.log('Server is running on http://localhost:5500');
});
