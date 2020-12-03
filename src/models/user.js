const pool = require('../db/config')
const jwt = require('jsonwebtoken')

class User{
    constructor(id, email, password){
        this._id = id
        this.email = email
        this.password = password
    }

    static getUsers(){
        return new Promise( (resolve, reject) => {
            pool.query('select * from users', (err, res) => {
                if(err) reject()
                console.log('[user model]', res.rows)
                resolve(res.rows)
            })
        } )
    }

    static getUserById(id) {
        return new Promise( (resolve, reject) => {
            pool.query('select * from users where _id='+id, (err, res) => {
                if(err || res.rowCount === 0) reject()
                console.log('[user model]', res.rows)
                resolve(res.rows[0])
            })
        } )
    }

    login(){
        return new Promise( (resolve, reject) => {
            pool.query('select * from users where email='+this.email, (err, res) => {
                user = res.rows[0]
                if(err || user) reject()
                if(user.password === this.password) {
                    const token = jwt.sign({_id: user._id}, 'bacha.code')
                    pool.query('insert into auth_tokens (user_id, token) values ('+ user._id+', '+token+')', (err, res) => {
                        if(err) reject()
                        resolve({user, token})
                    })
                }
                reject()
            })
        } )
    }
}

module.exports = User