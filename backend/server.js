const express = require('express')
const app = express()
const db = require('./database')
const userRoutes = require('./routes/user_route')
app.use(express.json())

app.use('/mahasiswa', userRoutes)

app.listen(3000, () => {
    console.log('Server jalan di port 3000')
})