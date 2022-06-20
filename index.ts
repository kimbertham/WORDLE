/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose  from 'mongoose'
import path from 'path'
import { Request, Response } from 'express'
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

app.use(json())

app.use('/api', router)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend')))

  app.get('*',(req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname,'../frontend'))
  })
}



app.listen(PORT, () => {
  console.log('listening on port 8000')
})

