import mongoose from "mongoose"

const User = mongoose.Schema({
    name: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    oldPasswords: {type: Array, required: true},
    gender: {type: String, default: null},
    phone: {type: Number, unique: true, default: new Date().getTime()},
    place: {type: String, default: null}
})

export default mongoose.model('User', User)