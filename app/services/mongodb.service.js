const mongoose = require('mongoose');

exports.connect = async () => {
    // connecting to mongo database
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to database ${mongoose.connection.host}`);


    } catch (error) {
        console.log(error);
    }
}
