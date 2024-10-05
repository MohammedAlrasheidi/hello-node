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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/ejs', (req, res) => {
  res.render('index', { myServerVariable: "something from server" });
});

app.get('/read', async (req, res) => {
  try {
    const response = await axios.post(`${mongoApiUrl}find`, {
      collection: "whatever-collection",
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
    console.error('Error reading from database:', error);
    res.status(500).send("Error reading from database.");
  }
});

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
    console.error('Error inserting into database:', error);
    res.status(500).send("Error inserting into database.");
  }
});

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
    console.error('Error updating document:', error);
    res.status(500).send("Error updating document.");
  }
});

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
    console.error('Error deleting document:', error);
    res.status(500).send("Error deleting document.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});
