const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const personSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
    born: {
        type: String,
    required: true,
    },
    alliegance: [String],
    playedBy: String,
    titles: [String],
    father: String,
    mother: String,
    spouse: String,
});


// userSchema.statics.findByCredentials = function(email, password)
// {
//   return new Promise( function(resolve, reject) {
//     User.findOne({ email }).then(function(user) {
//       if (!user) {
//         return reject('User does not exist')
//       }
//       bcryptjs.compare(password, user.password).then(function (match) {
//         if( match ) {
//           resolve(user)
//         }
//         reject('Wrong user or password')
//       }).catch( function(error) {
//         reject('Wrong user or password')
//       })
//     })
//   })
// }

// userSchema.pre('save', function(next) {
//   const user = this
//   if (user.isModified('password') ) {
//     bcryptjs.hash(user.password, 8).then(function(hash) {
//       user.password = hash
//       next()
//     }).catch(function(error) {
//       return next(error)
//     })
//   } else {
//     next()
//   }
// })

const Person = mongoose.model('Person', personSchema)

module.exports = Person
