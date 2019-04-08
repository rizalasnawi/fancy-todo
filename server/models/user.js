const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String
})

userSchema.pre('save', function(next) {
    if(this.password) {
        this.password = hashPassword(this.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User