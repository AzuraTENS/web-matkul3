const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // ganti sesuai MySQL kamu
  password: '',       // ganti sesuai password MySQL kamu
  database: 'mahasiswa' // ganti sesuai nama database kamu
});

db.connect((err) => {
  if (err) {
    console.error('Gagal konek ke database:', err.message);
    return;
  }
  console.log('Berhasil konek ke database MySQL');
});

module.exports = db;