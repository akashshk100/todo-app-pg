const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.get('/users', async (req, res) => {
    try{
        const users = await User.getUsers()
        if(!users) throw new Error()
        console.log('[user route]',users)
        res.send(users)
    }catch(err){
        res.status(404).send({error: 'No user found'})
    }
})

router.get('/users/:id', async (req, res) => {
    try{
        console.log(req.params.id)
        const user = await User.getUserById( parseInt(req.params.id) )
        if(!user) throw new Error()
        console.log('[user route]',user)
        res.send(user)
    }catch(err){
        res.status(404).send({error: 'No user found'})
    }
})

router.get('/login', async (req, res) => {
    try{
        const tempUser = new User(-1, req.body.email, req.body.password)
        const res = await tempUser.login()
        if(!res) throw new Error()
        console.log('[user route]',user)
        res.send(user)
    }catch(err){
        res.status(400).send({error: 'Invalid Authentication'})
    }
})

module.exports = router