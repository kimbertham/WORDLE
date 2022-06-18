/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose  from 'mongoose'
const  express = require('express')
const { json } = require('body-parser')
require('dotenv').config()
import { router } from './router'

const app = express()

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.iagak.mongodb.net/wurdle?retryWrites=true&w=majority`
  ,
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Connected successfully')
})


app.use(express.static(`${__dirname}/dist`))
app.use(json())
app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))


app.use('/api', router)


app.listen(process.env.PORT || 8000, () => {
  console.log('listening on port 8000')
})

