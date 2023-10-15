const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/Guestbook')
        .then((client) => {
            dbConnection = client.db();
            return callback();
        })
        .catch(err => {
            console.log(err);
            return callback(err);
        })
    },
    getDb: () => dbConnection
}

/*
const uri = "mongodb://localhost:27017/Guestbook";
const client = MongoClient.connect(uri);

async function connectToDb() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch{
        console.log("Error connecting to MongoDB", error);
    }
}

function getDatabaseClient() {
    return client;
}


module.exports = {
    connectToDb,
    getDatabaseClient,
};*/