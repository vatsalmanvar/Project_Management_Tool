const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://vatsalmanvar:vatsalmanvar@cluster0.ytkoko1.mongodb.net/test'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;


// mongo cloud URI: 'mongodb+srv://vatsalmanvar:vatsalmanvar@cluster0.ytkoko1.mongodb.net/test'
// const mongoURI = 'mongodb://localhost:27017/ProjectManagementTool?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
