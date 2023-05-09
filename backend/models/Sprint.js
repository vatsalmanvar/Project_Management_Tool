const mongoose = require('mongoose')
const { Schema } = mongoose;

const SprintSchema = new Schema({
    sprintName:{
        type: string,
        require: true
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    tickets:{
        type: [mongoose.Schema.Types.ObjectId],
        require: true
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
        type: string,
        default: "Inactive"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('sprint', SprintSchema); 