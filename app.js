require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const mongoApiUrl = "https://us-east-2.aws.data.mongodb-api.com/app/data-inolzhb/endpoint/data/v1/action/";
const apiKey = process.env.MONGO_API_KEY;
const PORT = process.env.PORT || 3000;

if (!apiKey) {
  console.error('Error: MONGO_API_KEY is missing in the environment variables.');
  process.exit(1);
}

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home route rendering index.ejs
app.get('/', (req, res) => {
  res.render('index'); // Ensure this points to views/index.ejs
});

// Read data route
app.get('/read', async (req, res) => {
  try {
    const response = await axios.post(`${mongoApiUrl}find`, {
      collection: "whatever-collection", // Make sure this is correct
      database: "malrasheidi_11",
      dataSource: "Cluster0"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });
    res.render('mongo', { postData: response.data.documents });
  } catch (error) {
    console.error('Error reading from database:', error.response ? error.response.data : error.message);
    res.status(500).send("Error reading from database.");
  }
});

// Insert data route
app.post('/insert', async (req, res) => {
  try {
    await axios.post(`${mongoApiUrl}insertOne`, {
      collection: "whatever-collection",
      database: "malrasheidi_11",
      dataSource: "Cluster0",
      document: { post: 'hardcoded post insert' }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });
    res.redirect('/read');
  } catch (error) {
    console.error('Error inserting into database:', error.response ? error.response.data : error.message);
    res.status(500).send("Error inserting into database.");
  }
});

// Update data route
app.post('/update/:id', async (req, res) => {
  try {
    await axios.post(`${mongoApiUrl}updateOne`, {
      collection: "whatever-collection",
      database: "malrasheidi_11",
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
    console.error('Error updating document:', error.response ? error.response.data : error.message);
    res.status(500).send("Error updating document.");
  }
});

// Delete data route
app.post('/delete/:id', async (req, res) => {
  try {
    await axios.post(`${mongoApiUrl}deleteOne`, {
      collection: "whatever-collection",
      database: "malrasheidi_11",
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
    console.error('Error deleting document:', error.response ? error.response.data : error.message);
    res.status(500).send("Error deleting document.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});
