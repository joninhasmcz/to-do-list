require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const connectDatabase = require('./config/db.config')
const taskRoutes = require('./routes/task.routes.js')
const logger = require('./utils/logger')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  connectDatabase()
}

app.use('/api/tasks', taskRoutes)

app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).json({
    erro: 'Erro interno do servidor'
  })
})

module.exports = app
