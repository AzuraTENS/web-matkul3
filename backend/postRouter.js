const router = require('express').Router()
const {db} = require('../model/dbConnection')

router.get('/data', (req, res)=>{
    const sqlQuery = "SELECT * FROM mahasiswa"
    db.query(sqlQuery, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result)
        }
    })
})

router.post('/buat', (req, res)=>{
    const userName = req.body.user_name
    const userEmail = req.body.user_email
    const userPassword = req.body.user_password

    const sqlQuery = "INSERT INTO mahasiswa(user_name, user_email, user_password)VALUES(?, ?, ?)"
    db.query(sqlQuery, [userName, userEmail, userPassword], (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send("Data berhasil ditambahkan")
        }
    })
})

module.exports = router