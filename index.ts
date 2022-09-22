/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose  from 'mongoose'
import path from 'path'
import { Request, Response } from 'express'
import { router } from './router'
import { newFriendGame } from './controllers/friendControllers'
require('dotenv').config()

const socketio = require('socket.io')
const http = require('http')
const  express = require('express')
const { json } = require('body-parser')

const app = express()
const PORT = process.env.PORT || 8000 

const server = http.createServer(app)
const io = socketio(server, { cors: { origin: '*' } }) //for omit cors error


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
  app.use(express.static('frontend/build'))

  app.get('*',(req: Request, res: Response) => {
    res.sendFile(path.resolve('frontend','build','index.html'))
  })
}
app.listen(PORT, () => {
  console.log('listening on port 8000')
})

io.on('connection', (socket: any) => {

  console.log('a user connected')
  socket.on('disconnect',() => console.log('User Disconnected'))
  socket.on('newGame', (id :string) => socket.to(id).emit('reUp', id))
  socket.on('joinroom',(data : string) =>  socket.join(data))
})


server.listen(PORT , (error: any) => {
  if (error) console.log(error)
  console.log(`Server started on port ${PORT}`)
})

// server.listen(4000, () => console.log('socket server on 4000'))