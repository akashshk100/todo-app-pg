const express = require('express')
const auth = require('../middlewares/auth')
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
    const user = new User(-1, req.body.email, req.body.password, [])
    user.login().then( token => {
        res.send({user, token})
    }).catch( err => {
        console.log('Throwing error', err)
        res.status(404).send({error: 'Invalid Credentials'})
    })
})

router.get('/logout', auth,  async (req, res) => {
    req.user.logout(req.token)
    res.send()
})

module.exports = router