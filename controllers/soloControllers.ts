import { Response } from 'express'
import { gameModel } from '../models'
import { ICustomReq } from '../auth/customReq'

export const getLastSolo = async (req :ICustomReq, res:Response) => {
  try {
    const game = await gameModel.aggregate([
      { $match: { user: req.currentUser._id } },
      { $sort: { createdAt: -1 } },
      { $limit: 1 },
      { 
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        } 
      },
      {
        $redact: {
          $cond: {
            if: {
              $eq: ['$completed', false] },
            then: '$$KEEP',
            else: '$$PRUNE'
          }
        }
      }
    ])

    res.status(201).json(game)
  } catch (err) {
    res.status(401).json( err)
    console.log(err)
  } 
}

export const newSoloGame = async (req :ICustomReq, res:Response) => {
  try {
    req.body.user = req.currentUser
    const game = (await gameModel.create(req.body))
    res.status(201).json(game)
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}

export const updateGame = async (req :ICustomReq, res:Response) => {
  try {
    const game = await gameModel.findByIdAndUpdate(req.params.id,req.body, { new: true })
    res.status(201).json(game)
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}


export const completeGame = async (req :ICustomReq, res:Response) => {
  try {
    const game = await gameModel.findByIdAndUpdate(req.params.id, { completed: true })
    res.status(201).json(game)
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}

export const getSoloGames = async (req :ICustomReq, res:Response) => {
  try {
    const games = await gameModel.find({ user: req.currentUser })
      .sort({ createdAt: -1 })
      .skip(req.body.num)
      .limit(5)
    res.status(201).json(games)
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}

// export const getSoloGames = async (req :ICustomReq, res:Response) => {
//   try {

//     const game = await roundModel.aggregate([
//       { $match: { friendship: new mongoose.Types.ObjectId(req.params.id) } },
//       { $sort: { createdAt: -1 } },
//       { $skip: req.body.skip },
//       { $limit: req.body.limit },
//       { $lookup: {
//         from: 'players',
//         localField: 'players',
//         foreignField: '_id',
//         as: 'players'
//       } },
//       { $unwind: '$players' },
//       { $lookup: {
//         from: 'users',
//         localField: 'players.user',
//         foreignField: '_id',
//         as: 'players.user'
//       } },
//       { $unwind: '$players.user' },
//       {
//         $project: {
//           _id: 1,
//           friendship: 1,
//           players: 1,
//           request: 1,
//           priority: { $eq: [ '$players.user._id', req.currentUser._id] }
//         } 
//       },
//       {
//         $sort: {
//           priority: -1
//         } 
//       },
//       { 
//         $group: { 
//           _id: '$_id' ,  
//           friendship: { $first: '$friendship' },
//           players: { $push: '$players' },
//           request: { $first: '$request' }
//         } 
//       }
//     ])

