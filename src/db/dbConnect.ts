import mongoose from 'mongoose';
import EnvConfig from '../config/envConfig';
// import envConfig from './envConfig';
// import envConfig from '../config/EnvConfig';


const env = EnvConfig();
const mongoURL = env.mongoURL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("MongoDB connected");



    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
};


export default connectDB;