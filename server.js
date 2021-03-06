const port = process.env.PORT || 3000

const express = require('express')
const path = require('path')
const yes = require('yes-https')
const session = require('express-session')
const app = express()

const backend = require('./backend/index')

// Force HTTPS
app.use(yes());
app.enable('trust proxy');

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'olavharaldhaakonmagnushansen',
    resave: true,
    saveUninitialized: true,
    name: 'session_cookie',
    expires: new Date(Date.now() + 31536000000),
    maxAge: 31536000000
}))


app.use('/api', backend)
app.use(express.static(path.join(__dirname, 'frontend-v2/dist')))
app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend-v2/dist/index.html'))
})

app.listen(port, () => {
    console.log('Server serving on port ' + port)
})