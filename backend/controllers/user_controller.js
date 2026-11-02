const db = require('../database');

// === GET semua user ===
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM mahasiswa", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      success: true,
      total: result.length,
      data: result
    });
  });
};

// === GET user by ID ===
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  
  db.query("SELECT * FROM mahasiswa WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }
    res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};

// === POST buat user baru ===
exports.createUser = (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  if (!user_name || !user_email || !user_password) {
    return res.status(400).json({
      success: false,
      message: 'Nama, email, dan password wajib diisi'
    });
  }

  const sql = "INSERT INTO mahasiswa (user_name, user_email, user_password) VALUES (?, ?, ?)";
  db.query(sql, [user_name, user_email, user_password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      success: true,
      message: 'User berhasil dibuat',
      id: result.insertId
    });
  });
};

// === PUT update user ===
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { user_name, user_email, user_password } = req.body;
  const sql = "UPDATE mahasiswa SET user_name = ?, user_email = ?, user_password = ? WHERE id = ?";

  db.query(sql, [user_name, user_email, user_password, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }
    res.status(200).json({
      success: true,
      message: 'User berhasil diupdate'
    });
  });
};

// === DELETE user ===
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM mahasiswa WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }
    res.status(200).json({
      success: true,
      message: 'User berhasil dihapus'
    });
  });
};