/* eslint-disable @typescript-eslint/no-var-requires */
const secureRoute = require('./auth/secureRoute').secureRoute
const soloControllers = require('./controllers/soloControllers')
const friendControllers = require('./controllers/friendControllers')



const auth = require('./auth/authControlers')

import { Router } from 'express'
export const router = Router()

router.route('/login')
  .post(auth.login)

router.route('/register')
  .post(auth.register)

//------

router.route('/find')
  .post(secureRoute,auth.findUsers)

router.route('/newFriend')
  .post(secureRoute, friendControllers.newFriend)

router.route('/getFriendship/:id')
  .get(secureRoute, friendControllers.getFriendship)


router.route('/getFriends')
  .post(secureRoute, friendControllers.getFriends)

//----------
router.route('/newSoloGame')
  .post(secureRoute, soloControllers.newSoloGame)

router.route('/getLastSolo')
  .get(secureRoute, soloControllers.getLastSolo)

router.route('/getSoloGames/:id')
  .post(secureRoute, soloControllers.getSoloGames)

router.route('/updateGame/:id')
  .post(secureRoute, soloControllers.updateGame)

router.route('/completeGame/:id')
  .post(secureRoute, soloControllers.completeGame)

  
//----------------

router.route('/newFriendGame')
  .post(secureRoute, friendControllers.newFriendGame)

router.route('/getFriendGames/:id')
  .post(secureRoute, friendControllers.getFriendGames)

router.route('/acceptRequest/:id')
  .post(secureRoute, friendControllers.acceptRequest)

router.route('/declineRequest/:id')
  .get(secureRoute, friendControllers.declineRequest)

router.route('/totalScore/:id')
  .get(secureRoute, friendControllers.totalScore)


