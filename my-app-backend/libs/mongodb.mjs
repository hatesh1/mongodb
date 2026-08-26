import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

import mongoose from 'mongoose'

const uri = process.env.MONGO_DB_URI

export const connectDatabase = async () => {
    if (!uri) {
        console.error('mongodb uri is required!')
        return
    }

    try {
        await mongoose.connect(uri, {
            dbName: 'my-mongodb'
        })
        console.log('mongoose is connected successfully!')
    } catch (error) {
        console.error(error)
        console.error('mongoose is disconnected!')
    }
}