const router = require('express').Router()
const users = require('../controllers/auth')
const people = require('../controllers/people')
const secureRoute = require('../lib/secureRoute')


router.route('/people')
  .get(people.index)
  .post(people.create)

router.route('/people/:id')
  .get(people.show)
  .put(secureRoute, people.update)
  .delete(secureRoute, people.destroy)

router.route('/people/:id/comments')
  .post(secureRoute, people.commentCreate)


router.route('/register')
  .post(users.register)

router.route('/people/:id/comments/:commentId')
  .delete(secureRoute, people.commentDelete)


router.route('/login')
  .post(users.login)
module.exports = router