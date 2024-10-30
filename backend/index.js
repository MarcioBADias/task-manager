const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParse = require('body-parser')

const Task = require('./models/Task')
const atlasUrl = 'mongodb+srv://taskmanagerUser:4EmggJKv1SwMp2EY@taskmanager-cluster.mongodb.net/taskmanager?retryWrites=true&w=majority'
const app = express()

app.use(cors())
app.use(bodyParse.json())

mongoose.connect(atlasUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.removeListener(5000, () => console.log('Server conectado na porta 5000'))
