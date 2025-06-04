const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { searchPeople, searchMovies } = require('./search');
const { logQuery, getStats } = require('./stats');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/search', async (req, res) => {
  const { name, type } = req.query;
  if (!name || !type) {
    return res.status(400).json({ error: 'Missing name or type' });
  }

  const start = Date.now();
  try {
    let result;
    if (type === 'people') {
      result = await searchPeople(name);
    } else if (type === 'movies') {
      result = await searchMovies(name);
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const duration = Date.now() - start;
    logQuery(name, duration);
    return res.json(result);
  } catch (err) {
    console.error('Search error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/stats', (req, res) => {
  return res.json(getStats());
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
