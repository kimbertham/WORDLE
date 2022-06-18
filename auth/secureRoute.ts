/* eslint-disable @typescript-eslint/no-var-requires */
import { Response } from 'express'
import { userModel } from './userModel'
import { ICustomReq } from './customReq'
const jwt = require('jsonwebtoken')
const secret = 'secret'


export const secureRoute = async (req:ICustomReq, res:Response, next: (arg0?: unknown) => void) => {
  try {
    if (!req.headers.authorization) throw new Error('Unauthorized, No Token')
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = await jwt.verify(token, secret)
    const user = await userModel.findById(payload.sub)
    if (!user) {
      throw new Error('Unauthorized')
    } else {
      req.currentUser = user
      next() 
    }
  } catch (err) {
    next(err)
  }
}
