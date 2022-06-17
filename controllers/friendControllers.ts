import { Response } from 'express'
import { friendModel, roundModel, gameModel } from '../models'
import { ICustomReq } from '../auth/customReq'
import mongoose from 'mongoose'

  
export const getFriendGames = async (req :ICustomReq, res:Response) => {
  try {

    const game = await roundModel.aggregate([
      { $match: { friendship: new mongoose.Types.ObjectId(req.params.id) } },
      { $sort: { createdAt: -1 } },
      { $skip: req.body.skip },
      { $limit: req.body.limit },
      { $lookup: {
        from: 'players',
        localField: 'players',
        foreignField: '_id',
        as: 'players'
      } },
      { $unwind: '$players' },
      { $lookup: {
        from: 'users',
        localField: 'players.user',
        foreignField: '_id',
        as: 'players.user'
      } },
      { $unwind: '$players.user' },
      {
        $project: {
          _id: 1,
          friendship: 1,
          players: 1,
          request: 1,
          priority: { $eq: [ '$players.user._id', req.currentUser._id] }
        } 
      },
      {
        $sort: {
          priority: -1
        } 
      },
      { 
        $group: { 
          _id: '$_id' ,  
          friendship: { $first: '$friendship' },
          players: { $push: '$players' },
          request: { $first: '$request' }
        } 
      }
    ])
    
    console.log(game)
    res.status(201).json(game)
  } catch (err) {
    res.status(401).json( err)
    console.log(err)
  } 
}
  
export const newFriendGame = async (req :ICustomReq, res:Response) => {
  try {
    const game = (await gameModel.create(req.body))
    const round = await roundModel.create({ players: [game], friendship: req.body.friendship })
    res.status(201).json(round)
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}


export const acceptRequest = async (req :ICustomReq, res:Response) => {
  try {
    const player2 = await gameModel.create(req.body)
    const game = await roundModel.findByIdAndUpdate(req.params.id,
      { request: false,
        $push: { players: player2 } },
      { new: true })
      .populate({ path: 'players',
        populate: {
          path: 'user',
          model: 'User'
        }  })
      
    res.status(201).json(game)
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}

export const declineRequest = async (req :ICustomReq, res:Response)=> {
  try {
    const game = await roundModel.findByIdAndDelete(req.params.id)
    res.status(201).json(game)
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}
  

export const totalScore = async (req :ICustomReq, res:Response) => {
  try {

    const scores = await roundModel.aggregate([
      { $match: { friendship: new mongoose.Types.ObjectId(req.params.id) } },
      { $lookup: {
        from: 'players',
        localField: 'players',
        foreignField: '_id',
        as: 'players'
      } },
      {
        $redact: {
          $cond: {
            if: {
              $eq: [{
                $allElementsTrue: {
                  $map: {
                    input: '$players',
                    in: '$$this.completed'
                  } } }
              , true]
            },
            then: '$$KEEP',
            else: '$$PRUNE'
          }
        }
      },
      { 
        $project: {
          winners: { 
            $filter: {
              input: '$players',
              cond: {
                $eq: [{ $size: '$$this.guesses' },
                  { $min: {
                    $map: { 
                      input: '$players.guesses', 
                      in: { $size: '$$this' } 
                    }
                  } }
                ] 
              }
            } 
          }
        }
      }
      ,
      {
        $match: { winners: { $size: 1 } } 
      },
      { 
        $group: { _id: '$winners.user', score: { $sum: 1 } } 
      },
      { 
        $addFields: { _id: { $arrayElemAt: [ '$_id', 0 ] } }
      },
      {
        $project: {
          _id: 1,
          score: 1,
          priority: { $eq: [ '$_id', req.currentUser._id] }
        } 
      },
      {
        $sort: {
          priority: -1
        } 
      }
    ])
    res.status(201).json(scores)
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}

//------------

export const newFriend = async (req :ICustomReq, res:Response) => {
  try {
    const users = { users: [req.body.user, req.currentUser] }
    const friend = await friendModel.create(users)
    res.status(201).json(friend)
  } catch (err) {
    res.status(401).json( err)
    console.log(err)
  } 
}

export const getFriends = async (req :ICustomReq, res:Response) => {
  try {
    const friends = await friendModel.find({ users: { '$in': [req.currentUser] } })
      .select('users' )
      .populate({
        'path': 'users',
        'match': { '_id': { $ne: req.currentUser._id } }
      })
    res.status(201).json(friends)
  } catch (err) {
    res.status(401).json( err)
    console.log(err)
  } 
}

export const getFriendship = async (req :ICustomReq, res:Response) => {
  try {
    const friends = await friendModel.findById(req.params.id)
      .populate('users')

    res.status(201).json(friends)
  } catch (err) {
    res.status(401).json( err)
    console.log(err)
  } 
}