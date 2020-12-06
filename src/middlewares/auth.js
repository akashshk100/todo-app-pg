const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.replace('Bearer ', '')
        const sign = jwt.verify(token, 'bacha.code')
        User.getUserById(sign._id).then( user => {
            if(user.tokens.includes(token)){
                req.user = new User(user._id, user.email, user.password, user.tokens)
                req.token = token
                next()
            }
            else{
                res.status(401).send({error: "Unauthorised"})
            }
        }).catch( err => {
            res.status(401).send({error: "Unauthorised"})
        } )
    }catch( e ){
        res.status(401).send({error: "Unauthorised"})
    }
    
    
}

module.exports = auth