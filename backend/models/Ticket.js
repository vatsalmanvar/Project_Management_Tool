const mongoose = require('mongoose')
const { Schema } = mongoose;

const TicketSchema = new Schema({
    ticketNumber:{
        type: String,
        require: true,
        unique: true
    },
    projectName:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    title:{
        type: String,
        default: "Not Specified"
    },
    description:{
        type: String,
        default: "Not Specified"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    ticketType:{
        type: String,
        default: "Task"
    },
    ticketStatus:{
        type: String,
        default: "To Do"
    },
    currentSprint:{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    history:{
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            },
            description: {
                type: [String],
                required: true
            }            
        }],
        default: []
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ticket', TicketSchema); 