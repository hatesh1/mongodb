
import mongoose from 'mongoose'

const uri = process.env.MONGO_DB_URI

export const connectDatabase = async () => {
    if (!uri) {
        console.error('mongodb uri is required!')
        return
    }

    try {
        await mongoose.connect(uri, {
            dbName: 'mongo'
        })
        console.log('mongoose is connected successfully!')
    } catch (error) {
        console.error(error)
        console.error('mongoose is disconnected!')
    }
}