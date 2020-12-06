const express = require('express')
const auth = require('../middlewares/auth')
const Task = require('../models/task')

const routes = express.Router()

routes.get('/tasks', auth, (req, res) => {
    Task.getTasks().then( tasks => {
        res.send(tasks)
    } ).catch( err => {
        res.status(500).send({error: err})
    } )
})

routes.post('/tasks', auth, (req, res) => {
    Task.addTask(req.body.title, req.body.body, req.body.dueDate, req.body.priority).then( task => {
        res.send({status: task})
    }).catch( err => {
        res.status(500).send({error: err})
    } )
})

routes.patch('/tasks/:id', auth, (req, res) => {
    const {title, body, createdAt, dueDate, completed, priority} = req.body 
    const task = new Task( req.params.id, title, body, createdAt, dueDate, completed, priority )
    task.save()
    res.send()
})

routes.patch('/status/:id', auth, (req, res) => {
    Task.getTaskById(req.params.id).then( task => {
        task.completed = !task.completed
        task.save()
        res.send()
    }).catch( err => {
        res.status(404).send({error: err})
    } )
}) 

routes.delete('/tasks/:id', auth, (req, res) => {
    Task.getTaskById(req.params.id).then( task => {
        console.log(task)
        task.delete()
        res.send()
    }).catch( err => {
        res.status(404).send({error: err})
    } )
})

module.exports = routes 