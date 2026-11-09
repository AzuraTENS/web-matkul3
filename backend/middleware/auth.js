



exports.cekLogin = (req, res, next) => {
  // Cek apakah session punya userId
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ 
      error: 'Akses ditolak. Silakan login dulu.' 
    });
  }

  // Kalau ada, simpan data user ke req (biar bisa dipakai di controller)
  req.user = {
    id: req.session.userId,
    username: req.session.username
  };

  // Lanjut ke route berikutnya
  next();
};

module.exports = router;