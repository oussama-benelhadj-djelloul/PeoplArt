const mongoose = require('mongoose');
const config = require('../../config')

const connect = async () => {
    try {
        //connect to db cloud
        const con = await mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Mongo connect')
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connect