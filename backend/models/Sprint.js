const mongoose = require('mongoose')
const { Schema } = mongoose;

const SprintSchema = new Schema({
    sprintName:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    tickets:{
        type: [mongoose.Schema.Types.ObjectId]
    },
    startDate:{
        type: Date,
        require: true
    },
    endDate:{
        type: Date,
        require: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    status:{
        type: String,
        default: "Active"
    },
    history:{
        type: [String],
        default: []
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('sprint', SprintSchema); 