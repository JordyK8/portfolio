const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

// Configuring express to handle json
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// Configuring paths to serve up staticly
const publicDirectoryPath = path.join(__dirname, '../../frontend/public')
const viewsPath = path.join(__dirname, '../../frontend/templates/views')
const partialsPath = path.join(__dirname, '../../frontend/templates/partials')

//DB
const db = require('../utils/db/db')
const Namespace = require('../utils/db/Namespace')
const Room = require('../utils/db/Room')
const ChatMessage = require('../utils/db/ChatMessage')
db()

// Set up port for local or developed enviroment
const PORT = process.env.PORT || 3000

//Setting up view enigne
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Routes setup
app.get('/', (req, res) => {res.render('home', {title: 'Home'})})
app.use('/admin', require('../utils/api/admin'))
app.use('/addNamespace', require('../utils/api/namespace'))
app.use('/updateNamespace', require('../utils/api/updateNamespace'))
app.use('/deleteNamespace', require('../utils/api/deleteNamespace'))
app.use('/addRoom', require('../utils/api/addRoom'))

// Server Listener
const expressServer = app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)})


//SOCKET IO
const socketio = require('socket.io')
const io = socketio(expressServer)
const socketApp = require('./socketio')
socketApp(io)