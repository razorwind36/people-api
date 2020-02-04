const mongoose = require('mongoose')

const { dbURI } = require('../config/environment')

const person = require('../models/person')

const User = require('../models/user')


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err,db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'Ayy lmao',
          email: 'ayy@lamo.com',
          password: '123',
          passwordComfirmation: '123'
        },
        {
          username: 'Lmao Ayy',
          email: 'lamo@ayy.com',
          password: 'pass',
          passwordComfirmation: 'pass'
        }

      ])
    })
    .then(() => {
      return person.create([
        {
          name: 'Ayy lmao',
          age: 78,
          height: 160
        }
      ])
    })
    .then(createdPeople => console.log(`${'⛹🏼‍♀️ '.repeat(createdPeople.length)} People created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})