const pool = require('../db/config')
const jwt = require('jsonwebtoken')

class User{
    constructor(id, email, password, tokens){
        this._id = id
        this.email = email
        this.password = password
        this.tokens = tokens
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
            pool.query("select * from users where email='"+this.email+"'", (err, res) => {
                const user = res.rows[0]
                if(err || !user) reject(err)
                if(user.password === this.password) {
                    this._id = user._id
                    this.tokens = user.tokens
                    const token = jwt.sign({_id: user._id}, 'bacha.code')
                    this.tokens.push(token)
                    this.save()
                    resolve(token)
                }
                reject('password not matched')
            })
        } )
    }

    logout(sessionToken){
        this.tokens = this.tokens.filter( token => {
            return token !== sessionToken 
        } )
        console.log(this.tokens)
        this.save()
    }

    async save(){
        await pool.query("update users set email = $1, password = $2, tokens = $3 where _id = $4", [this.email, this.password, this.tokens, this._id] )
    }
}

module.exports = User