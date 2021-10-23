import { config } from '../config/constant'
import mongoose from 'mongoose'

export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
            console.log('Database connected')
        } catch(err) {
            console.error(err.message)
            process.exit(1)
        }
    }
}