/* eslint-disable @typescript-eslint/no-var-requires */
import { userModel } from './userModel'
import { Request, Response } from 'express'
const jwt = require('jsonwebtoken')
import { ICustomReq } from './customReq'
const secret = 'secret'


export const login = async (req : Request,res:Response) => {
  try {
    const user = await userModel.findOne({ username: req.body.username })
    if (!user){
      throw new Error('No User Found')
    }

    if (!user.validatePassword(req.body.password)) {
      throw new Error('Unauthorized Wrong Password')
    }

    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '30 days' })
    res.status(202).json({ user, token })
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Invalid Credentials' })
  }
}


export const register = async (req : Request,res:Response) => {
  try {
    const user = await userModel.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(401).json( err)
    console.log(err)
  } 
}

export const findUsers = async (req : ICustomReq,res:Response) => {
  try {
  
    const users = req.body.username !== '' ? 
      await userModel.find({ '$and':
        [ { '_id': { '$ne': req.currentUser._id } },
          { 'username': { '$regex': req.body.username, '$options': 'i' } }]
      }) : []
    res.status(201).json(users)
  
  } catch (err) {
    res.status(401).json( err)
    console.log(err)
  } 
}
