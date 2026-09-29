const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());          // penting! biar req.body bisa dibaca
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

// Root
app.get('/', (req, res) => {
  res.json({ message: 'API jalan 🚀', info: 'Coba GET /api/mahasiswa' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} tidak ditemukan` });
});

// Start
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});