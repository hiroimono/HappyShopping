import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        // throw new Error('CONNECTION ERROR');
        console.log('MongoDB connection: '.bgYellow.black.bold, connection.connection.host.yellow.bold);
    } catch (error) {
        console.error('Error: '.bgRed.white.bold, error.message.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;