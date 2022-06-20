/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose  from 'mongoose'
import path from 'path'
const  express = require('express')
const { json } = require('body-parser')
require('dotenv').config()
import { router } from './router'

const app = express()
const PORT = process.env.PORT || 8000

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

app.use(express.static(__dirname + '/dist/'))

app.get('*', function (_request: any, response: { sendFile: (arg0: any) => void }) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.use(json())

app.use('/api', router)


app.listen(PORT, () => {
  console.log('listening on port 8000')
})

