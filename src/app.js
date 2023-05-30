require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFoundMiddleware  = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const authRoute = require('./routes/authRoute')

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


app.use(rateLimit({
    windowMs: 1000*60*15,
    max: 2000,
    message: {message: 'too many requests'}
}))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/auth',authRoute)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


app.listen(process.env.PORT || 8000,() => 
console.log('Server runnning on port ' + process.env.PORT))