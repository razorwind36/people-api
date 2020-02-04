const Person = require('../models/person')

function index(req, res) {

  Person
    .find()
    .populate('user')
    .then(foundPerson => res.status(200).json(foundPerson))
    .catch(err => console.log(err))
}

function create(req, res) {
  req.body.user = req.currentUser
  Person
    .create(req.body)
    .then(createdPerson => res.status(201).json(createdPerson))
    .catch(err => console.log(err))
}

function show(req, res) {
  Person
    .findById(req.params.id)
    .then(person => res.status(202).json(person))
    .catch(err => console.log(err))
}

function update(req, res, next){
  Person
    .findById(req.params.id)
    .then(person => {
      if (!person) return res.status(404).json({ message: 'ayy this dont be existing' })
      if (!person.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })

      Object.assign(person, req.body)

      return person.save()
    })
    .then(updatedPerson => res.status(202).json(updatedPerson))
    .catch(next)
} 

function destroy(req, res) {
  Person
    .findById(req.params.id)
    .then(person => {
      if (!person) return res.status(404).json({ message: 'ayy this dont be existing' })
      if (!person.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })

      Object.assign(person, req.body)

      return person.save()
    })
    .then(()=> res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}

function commentCreate(req, res, next) {
  req.body.user = req.currentUser
  Person
    .findById(req.params.id)
    .then(person => {
      if (!person) return res.status(404).json({ message: 'ayy this dont be existing' })
      person.comments.push(req.body)
      return person.save()
    })
    .then(person => res.status(201).json(person))
    .catch(next)
}

function commentDelete(req, res){
  Person
    .findById(req.params.id)
    .then(person => {
      if (!person) return res.status(404).json({ message: 'ayy this dont be existing' })
      const comment = person.comments.id(req.params.commentid)

      comment.remove()

      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).json({ message: 'Unauthorized' })
      } else {
        return person.save().then(() => res.sendStatus(204))
      }
    })
    .then(person => res.status(202).json(person))
    .catch(err => res.json(err))
}

module.exports = { index, create, show, update, destroy, commentCreate, commentDelete }