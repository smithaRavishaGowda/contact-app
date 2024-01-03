require('dotenv').config()

const express = require('express')
const cors = require('cors')
const PORT = Number(process.env.PORT)
const connectDB = require('./db/connectDb')

const app = express()
//view engine
app.set('view engine', 'pug')
app.set('views', './view')

//static declaration
app.use(express.static('./view'))

//body parsermiddleware
app.use(express.urlencoded({extended: false})) //query format of incoming data
app.use(express.json())//receive json format data

//import router module
app.use(`/`, require('./route/contact_view_route'))
app.use(`/api/contact`, require('./route/contact_route'))

//import router module
// app.use(`/api/contact`, require('./route/contact_route'))

//default route
app.all(`*`, (req, res) => {
    res.status(404).json({msg: `Requested path not found, try/api/contact`})
})

//server listen
app.listen(PORT, () => {
     connectDB()
    console.log(`server is running @ http://localhost:${PORT}`)
})