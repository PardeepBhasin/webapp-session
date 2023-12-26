import mongoose, { Connection } from "mongoose";

const MongoURI = process.env.MONGO_URI!
if (!MongoURI) {
    throw new Error('Mongo uri missing');
}

let connectDB: Connection | void

async function connectToDatabase() {
    try {
        if (!connectDB) {
            connectDB = await mongoose.connect(MongoURI).then(() => console.log("connected"))
        }
    } catch (error: any) {
        throw new Error('connection not established', error);
    }
    return connectDB;
}

export default connectToDatabase;