const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const PORT = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

app.listen(PORT, () => {
    console.log('Listening on PORT: ', PORT)
})