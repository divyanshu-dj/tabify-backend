const express = require('express');
const cors = require('cors');
const path = require('path');
const downloadAndTrimVideo = require('./services/downloadService');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/api/trim', async (req, res) => {
  try {
    const { url, start, end } = req.body;
    const trimmedVideoPath = await downloadAndTrimVideo(url, start, end);
    console.log('Trimmed video path:', trimmedVideoPath);
    res.download(trimmedVideoPath, (err) => {
      if (err) {
        console.error('Error in /api/trim route:', err);
        res.status(500).json({ error: err.message });
      }
    });
  } catch (err) {
    console.error('Error in /api/trim try-catch block:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
