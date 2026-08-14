import mongoose from "mongoose"
import { emailPattern } from "../../utils/core.mjs"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },

    age: {
        type: Number,
        required: true,
        min: 18,
        max: 100,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: emailPattern,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    },

    profilePicture: {
        type: String,
        trim: true,
        default: null,
    },

}, { timestamps: true })

export const UserModel = mongoose.model("users", userSchema)