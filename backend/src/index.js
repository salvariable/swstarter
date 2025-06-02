const express = require('express');
const cors = require('cors');
const { recordSearch, getStats } = require('./stats');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
  const { name, type } = req.query;
  if (!name || !type) {
    return res.status(400).json({ error: 'Missing name or type' });
  }

  try {
    const endpoint = type === 'people' ? 'people' : 'films';
    const search = type === 'people' ? 'name' : 'title';

    const response = await fetch(`https://swapi.tech/api/${endpoint}/?${search}=${name}`);
    const data = await response.json();
    recordSearch(name);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from SWAPI' });
  }
});

app.get('/stats', (req, res) => {
  res.json(getStats());
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
