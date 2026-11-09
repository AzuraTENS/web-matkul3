const bcrypt = require('bcrypt');
const db = require('../database');

const publicUser = (user) => ({
  id: user.id,
  user_name: user.user_name,
  user_email: user.user_email
});

exports.register = async (req, res) => {
  const userName = req.body.user_name || req.body.name;
  const userEmail = req.body.user_email || req.body.email;
  const userPassword = req.body.user_password || req.body.password;

  if (!userName || !userEmail || !userPassword) {
    return res.status(400).json({
      success: false,
      message: 'Nama, email, dan password wajib diisi'
    });
  }

  db.query(
    'SELECT id FROM mahasiswa WHERE user_email = ? LIMIT 1',
    [userEmail],
    async (checkError, users) => {
      if (checkError) {
        return res.status(500).json({ success: false, error: checkError.message });
      }
      if (users.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Email sudah terdaftar'
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        db.query(
          'INSERT INTO mahasiswa (user_name, user_email, user_password) VALUES (?, ?, ?)',
          [userName, userEmail, hashedPassword],
          (insertError, result) => {
            if (insertError) {
              return res.status(500).json({
                success: false,
                error: insertError.message
              });
            }

            return res.status(201).json({
              success: true,
              message: 'Registrasi berhasil',
              data: {
                id: result.insertId,
                user_name: userName,
                user_email: userEmail
              }
            });
          }
        );
      } catch (hashError) {
        return res.status(500).json({
          success: false,
          error: hashError.message
        });
      }
    }
  );
};

exports.login = (req, res) => {
  const userEmail = req.body.user_email || req.body.email;
  const userPassword = req.body.user_password || req.body.password;

  if (!userEmail || !userPassword) {
    return res.status(400).json({
      success: false,
      message: 'Email dan password wajib diisi'
    });
  }

  db.query(
    'SELECT * FROM mahasiswa WHERE user_email = ? LIMIT 1',
    [userEmail],
    async (error, users) => {
      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Email atau password salah'
        });
      }

      const user = users[0];
      try {
        const passwordMatches = await bcrypt.compare(userPassword, user.user_password);
        if (!passwordMatches) {
          return res.status(401).json({
            success: false,
            message: 'Email atau password salah'
          });
        }

        req.session.user = publicUser(user);
        return res.status(200).json({
          success: true,
          message: 'Login berhasil',
          data: publicUser(user)
        });
      } catch (compareError) {
        return res.status(500).json({
          success: false,
          error: compareError.message
        });
      }
    }
  );
};

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Logout gagal'
      });
    }

    res.clearCookie('connect.sid');
    return res.status(200).json({
      success: true,
      message: 'Logout berhasil'
    });
  });
};

exports.getProfile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Belum login'
    });
  }

  return res.status(200).json({
    success: true,
    data: req.session.user
  });
};