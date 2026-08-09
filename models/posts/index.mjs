import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [50, 'Title cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    }
}, { timestamps: true })

export const PostModel = mongoose.model('posts', postSchema)