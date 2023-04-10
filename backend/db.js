const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/ProjectManagementTool?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;