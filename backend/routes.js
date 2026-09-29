const express = require('express');
const router = express.Router();
const db = require('./db');

// ============================
// GET semua mahasiswa
// URL: http://localhost:3000/api/mahasiswa
// ============================
router.get('/mahasiswa', (req, res) => {
  const sql = 'SELECT * FROM mahasiswa';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal ambil data' });
    }
    res.json(results);
  });
});

// ============================
// GET mahasiswa by ID
// URL: http://localhost:3000/api/mahasiswa/1
// ============================
router.get('/mahasiswa/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM mahasiswa WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal ambil data' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json(results[0]);
  });
});

// ============================
// POST tambah mahasiswa
// URL: http://localhost:3000/api/mahasiswa
// Body: { "nama": "Budi", "nim": "12345", "jurusan": "Informatika" }
// ============================
router.post('/mahasiswa', (req, res) => {
  const { nama, nim, jurusan } = req.body;

  if (!nama || !nim) {
    return res.status(400).json({ error: 'Nama dan NIM wajib diisi' });
  }

  const sql = 'INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)';
  db.query(sql, [nama, nim, jurusan], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal tambah data' });
    }
    res.status(201).json({
      message: 'Data berhasil ditambahkan',
      id: results.insertId,
      data: { nama, nim, jurusan }
    });
  });
});

// ============================
// PUT update mahasiswa
// URL: http://localhost:3000/api/mahasiswa/1
// Body: { "nama": "Budi Baru", "nim": "12345", "jurusan": "SI" }
// ============================
router.put('/mahasiswa/:id', (req, res) => {
  const { id } = req.params;
  const { nama, nim, jurusan } = req.body;

  const sql = 'UPDATE mahasiswa SET nama = ?, nim = ?, jurusan = ? WHERE id = ?';
  db.query(sql, [nama, nim, jurusan, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal update data' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil diupdate' });
  });
});

// ============================
// DELETE mahasiswa
// URL: http://localhost:3000/api/mahasiswa/1
// ============================
router.delete('/mahasiswa/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM mahasiswa WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Gagal hapus data' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil dihapus' });
  });
});

module.exports = router;