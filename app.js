require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
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
  res.render('index');
});

app.get('/read', async (req, res) => {
  try {
    const response = await fetch(`${mongoApiUrl}find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        collection: "whatever-collection",
        database: "malrasheidi_11",
        dataSource: "Cluster0"
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error reading from database');
    }

    res.render('mongo', { postData: data.documents });
  } catch (error) {
    console.error('Error reading from database:', error.message);
    res.status(500).send("Error reading from database.");
  }
});

app.post('/insert', async (req, res) => {
  try {
    const response = await fetch(`${mongoApiUrl}insertOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        collection: "whatever-collection",
        database: "malrasheidi_11",
        dataSource: "Cluster0",
        document: { post: 'hardcoded post insert' }
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error inserting into database');
    }

    res.redirect('/read');
  } catch (error) {
    console.error('Error inserting into database:', error.message);
    res.status(500).send("Error inserting into database.");
  }
});

app.post('/update/:id', async (req, res) => {
  try {
    const response = await fetch(`${mongoApiUrl}updateOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        collection: "whatever-collection",
        database: "malrasheidi_11",
        dataSource: "Cluster0",
        filter: { "_id": { "$oid": req.params.id } },
        update: { "$set": { "post": "NEW POST" } }
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error updating document');
    }

    res.redirect('/read');
  } catch (error) {
    console.error('Error updating document:', error.message);
    res.status(500).send("Error updating document.");
  }
});

app.post('/delete/:id', async (req, res) => {
  try {
    const response = await fetch(`${mongoApiUrl}deleteOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        collection: "whatever-collection",
        database: "malrasheidi_11",
        dataSource: "Cluster0",
        filter: { "_id": { "$oid": req.params.id } }
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error deleting document');
    }

    res.redirect('/read');
  } catch (error) {
    console.error('Error deleting document:', error.message);
    res.status(500).send("Error deleting document.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});
