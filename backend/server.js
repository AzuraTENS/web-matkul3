const express = require('express')
const app = express()
const db = require('./database')
const session = require('express-session');
const userRoutes = require('./routes/user_route')
const auth = require('./routes/auth')
app.use(express.json())

app.use(session({
  secret: 'rizki22', // ganti dengan string acak yang aman
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 2 // 2 menit (120.000 ms)
  }
}));

app.use('/mahasiswa', userRoutes)
app.use('/auth', auth)

app.listen(3000, () => {
    console.log('Server jalan di port 3000')
})