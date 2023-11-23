const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('src'));

const DATABASE_FILE = './data/database.json';

function readDatabase() {
  try {
    const data = fs.readFileSync(DATABASE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return {};
  }
}

// Write data to JSON file
function writeDatabase(data) {
  try {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to database:', err);
  }
}

// API Endpoint to get game data
app.get('/api/games', (req, res) => {
  const data = readDatabase();
  res.json(data.games || []);
});

// API Endpoint to add/update game data
app.post('/api/games', (req, res) => {
  const currentData = readDatabase();
  const newGameData = req.body; // Assuming the body contains game data
  currentData.games = currentData.games || [];
  currentData.games.push(newGameData); // Add or update logic as per your requirement
  writeDatabase(currentData);
  res.json({ success: true, message: 'Game data updated' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
