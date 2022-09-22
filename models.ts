import * as mongoose from 'mongoose'
import { IUser } from './auth/userModel'

export interface IRound {
  friendship: IFriend
  request:boolean
  players: IGame[]
}

interface IFriend {
  rounds: IRound[]
  users: IUser[]
}

export interface IGame {
  user: IUser
  guesses: string[]
  score: number
}

export const friendSchema = new mongoose.Schema({
  rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Games' } ],
  users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ]
},{
  timestamps: true,
  strict: false })


export const roundSchema = new mongoose.Schema({
  friendship: { type: mongoose.Schema.Types.ObjectId, ref: 'Friend' },
  request: { type: mongoose.Schema.Types.Mixed, required: true, default: true },
  players: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, {
  timestamps: true,
  strict: false })

export const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  word: { type: String },
  guesses: [{ type: String } ],
  completed: { type: Boolean, default: false }
},{
  timestamps: true,
  strict: false })

export const friendModel = mongoose.model<IFriend & mongoose.Document>('Friend', friendSchema)
export const gameModel = mongoose.model<IGame & mongoose.Document>('Player', gameSchema)
export const roundModel = mongoose.model<IRound & mongoose.Document>('Games', roundSchema)
