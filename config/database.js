import mongoose from 'mongo'
const { MONGODB_URL } = process.env

mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

mongoose.connection
  .on('open', () => console.log('Mongoose connected'))
  .on('close', () => console.log('Disconnected from Mongoose'))
  .on('error', (error) => console.log(error))

module.exports = mongoose
