const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Force database name to lowercase
        const dbName = 'furniture_rental'.toLowerCase();
        const mongoURI = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${dbName}`;
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            family: 4
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${dbName}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (error.name === 'MongoServerError' && error.message.includes('already exists with different case')) {
            console.error('Please drop the existing database and try again');
        }
        process.exit(1);
    }
};

module.exports = connectDB; 