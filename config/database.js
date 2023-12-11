const mongoose = require('mongoose');

const connectionString = 'mongodb://mongo:F1DDA41hb4355dBhGgDHFdhE1cHBcHhb@viaduct.proxy.rlwy.net:12855';

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('database is connected!');
    } catch(err) {
        console.log('Error with initializing database!');
        console.log(err.message);
        process.exit(1);
    }
}; 
