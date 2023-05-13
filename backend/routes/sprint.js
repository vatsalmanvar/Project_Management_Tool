const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const Sprint = require('../models/Sprint');
const JWT_SECRET = "Thisisagoodapplication"


// ROUTE 1: create sprint: POST "/api/sprint/create-sprint". Login required
router.post('/create-sprint', fetchuser , [
    body('projectId', 'Enter a valid project-Id').isLength({ min: 1 }),
    body('sprintName', 'Enter a valid sprint name of atleast 2 character').isLength({ min: 2 })
], async(req, res) => {
    try {
        const {sprintName, projectId, tickets, startDate, endDate} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userWantToCreateSprint = req.user.id;
        const user = await User.findById(userWantToCreateSprint).select("-password")

        let projectObject = await Project.findById(projectId);
        if(!projectObject){return res.status(404).send("Project Not Found")}
        
        const ticketsIdArray = [];
        for (let i = 0; i < tickets.length; i++) {
            let tick = await Ticket.findById(tickets[i]);
            if(!tick){return res.status(404).send("Ticket not found")}
            ticketsIdArray.push(tick._id);
        }

        const newSprint = new Sprint({
            sprintName, projectId, tickets: ticketsIdArray, startDate, endDate, createdBy: req.user.id 
        })

        const savedSprint = await newSprint.save();
        res.status(200).send({"success":"Sprint Saved Successfully"});

        res.send();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router;