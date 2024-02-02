import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowerCase: true
    },
    image: String,
    password: String

}) 
export const User = mongoose.models.users || mongoose.model('users',userSchema)