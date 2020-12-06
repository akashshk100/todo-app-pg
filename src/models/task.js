const pool = require("../db/config")

class Task {

    constructor(id, title, body, createdAt, dueDate, completed, priority){
        this._id = id
        this.title = title
        this.body = body
        this.createdAt = createdAt
        this.dueDate = dueDate
        this.completed = completed
        this.priority = priority
    }

    static getTasks = () => {
        return new Promise( (resolve, reject) => {
            pool.query("select * from tasks").then( res => {
                resolve(res.rows)
            }).catch( err => {
                reject(err.message)
            } )
        } ) 
    }

    static getTaskById = (id) => {
        console.log('inside')
        return new Promise( (resolve, reject) => {
            pool.query("select * from tasks where _id = $1", [id]).then( res => {
                let {_id,title, body, createdAt, dueDate, completed, priority} = res.rows[0]
                const task = new Task(_id, title, body, createdAt, dueDate, completed, priority)
                resolve(task)
            }).catch( err => {
                reject(err.message)
            } )
        } )
    }

    static addTask = (title, body, dueDate, priority) => {
        return new Promise( (resolve, reject) => {
            pool.query("insert into tasks (title, body, dueDate, priority) values ($1, $2, $3, $4)", [title, body, dueDate, priority]).then( res => {
                resolve('Task Added')
            }).catch( err => {
                reject('No tasks created')
            } )
        } ) 
    }

    async save(){
        await pool.query("update tasks set title = $1, body = $2, dueDate = $3, completed = $4, priority = $5 where _id = $6", 
        [this.title, this.body, this.dueDate, this.completed, this.priority, this._id] )
    }

    async delete(){
        await pool.query("delete from tasks where _id = $1", [this._id] )
    }
}

module.exports = Task