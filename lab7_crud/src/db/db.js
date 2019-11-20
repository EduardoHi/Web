const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://admin:admin@cluster0-qyxkh.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})







