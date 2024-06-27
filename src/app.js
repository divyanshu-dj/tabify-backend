import express from 'express';
import cors from 'cors';
import path from 'path';
import { downloadAndTrimVideo } from './services/downloadService';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/api/trim', (req, res) => {
  try {
    const { url, start, end } = req.body();
    const trimmedaVideoPath = downloadAndTrimVideo(url, start, end);
    res.download(trimmedaVideoPath, (err) => {
      if ( err) {
        console.error('Error in /api/trim route: ', err);
        res.status(500).json({ error: err.message });
      }
    });
  } catch (err) {
    console.error('Error in /api/trim trycatch block: ', err);
    res.status(500).json({ error: err.message });
  }
});

export default app;
