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

function writeDatabase(data) {
  try {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to database:', err);
  }
}

app.get('/api/games', (req, res) => {
  const data = readDatabase();
  res.json(data.games || []);
});

app.post('/api/games', (req, res) => {
  const currentData = readDatabase();
  currentData.games = currentData.games || [];
  const newGame = req.body;
  currentData.games.push(newGame);
  writeDatabase(currentData);
  res.json({ success: true, message: 'Game data updated' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
