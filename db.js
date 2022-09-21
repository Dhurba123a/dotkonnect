const mongoose = require('mongoose');
const conn = "mongodb+srv://dhurba:CodeExecution1@cluster0.m6dnc.mongodb.net/dotkonnect?retryWrites=true&w=majority";
const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, db) => {
    if (err) console.log(err.message)
})
const ApiSchema = new mongoose.Schema({
    url: String,
    type: String,
    apikey: String,
    city: String,
    days: Number,
    aqi: String,
    alert: String
});

const Apis = connection.model('Apis', ApiSchema);

module.exports = connection;