import mongoose from '../config/database.js'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    badgeName: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    resetToken: String,
    resetTokenExpiry: Date
  },
  { timestamps: true }
)

const User = model('User', userSchema)

export default User
