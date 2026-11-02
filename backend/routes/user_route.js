// 1️⃣ Import Express
const express = require('express');

// 2️⃣ Buat router instance
const router = express.Router();

// 3️⃣ Import controller
const userController = require('../controllers/user_controller');

// 4️⃣ Daftarkan route
router.get('/',      userController.getAllUsers);   // GET  /mahasiswa
router.get('/:id',   userController.getUserById);   // GET  /mahasiswa/:id
router.post('/',     userController.createUser);    // POST /mahasiswa
router.put('/:id',   userController.updateUser);    // PUT  /mahasiswa/:id
router.delete('/:id',userController.deleteUser);    // DELETE /mahasiswa/:id


// 5️⃣ Export router
module.exports = router;