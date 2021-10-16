require('dotenv').config();

const config = {
  port: 5000,
  dbUrlMongoDB: "mongodb+srv://user:admin@us-east.v5l6v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  minTimesReportedToConsiderTrue: 4
};

module.exports = config;