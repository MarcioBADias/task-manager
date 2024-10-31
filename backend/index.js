const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const Task = require('./models/Task')
const connectDatabase = require('./dataBase/db')

const app = express()

connectDatabase()
app.use(cors())
app.use(bodyParser.json())

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find().sort('order')
    res.json(tasks)
  })
  
  app.post('/tasks', async (req, res) => {
    try {
      const order = (await Task.countDocuments()) + 1
      const task = new Task({ ...req.body, order })
      await task.save()
      res.status(201).json(task)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
  
  app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.status(204).send()
  })
  
  app.put('/tasks/:id', async (req, res) => {
    const { name } = req.body
    const existingTask = await Task.findOne({ name })
    if (existingTask && existingTask._id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'Task name already exists' })
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(task)
  })

app.listen(5000, () => console.log('Server conectado na porta 5000'))
