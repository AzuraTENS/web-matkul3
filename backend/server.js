const express = require('express')
const app = express()
const db = require('./database')
app.use(express.json())

app.get('/data', (req, res) => {
    const sqlQuery = "SELECT * FROM mahasiswa"

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({ error: 'Gagal mengambil data' })
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

app.post('/post/buat', (req, res) => {
    const { user_name, user_email, user_password } = req.body
    const sql = "INSERT INTO mahasiswa (user_name, user_email, user_password) VALUES (?, ?, ?)"

    db.query(sql, [user_name, user_email, user_password], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({ error: 'Gagal menambah data' })
        } else {
            res.send({ message: 'Data berhasil ditambahkan', id: result.insertId })
        }
    })
})

app.put('/post/update/:id', (req, res) => {
    const { id } = req.params
    const { user_name, user_email, user_password } = req.body

    const sql = "UPDATE mahasiswa SET user_name = ?, user_email = ?, user_password = ? WHERE id = ?"

    db.query(sql, [user_name, user_email, user_password, id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({ error: 'Gagal mengupdate data' })
        } else if (result.affectedRows === 0) {
            res.status(404).send({ error: 'Data tidak ditemukan' })
        } else {
            res.send({ message: 'Data berhasil diupdate', id: id })
        }
    })
})

app.listen(3000, () => {
    console.log('Server jalan di port 3000')
})