const port = process.env.PORT || 4000

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/people-api'

const secret = process.env.SECRET || 'shhh is of secret'

module.exports = { port, dbURI, secret }