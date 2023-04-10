const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    projectName:{
        type: String,
        require: true,
        unique: true
    },
    description:{
        type: String,
        default: "Not Specified"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    admin:{
        type: [mongoose.Schema.Types.ObjectId],
        require: true
    },
    developers:{
        type: [mongoose.Schema.Types.ObjectId]
    },
    nextTicketNumber:{
        type: Number,
        default: 360004
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('project', ProjectSchema); 