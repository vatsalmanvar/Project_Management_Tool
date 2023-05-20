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

        for (let i = 0; i < tickets.length; i++) {
            let tick = await Ticket.findById(tickets[i]);
            tick.currentSprint = savedSprint._id;
            tick.history.push({
                user: req.user.id,
                description: `Added To Sprint "${savedSprint.sprintName}"`
            })
            tick = await Ticket.findByIdAndUpdate(tickets[i], tick)
        }

        res.status(200).send({"success":"Sprint Saved Successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

// ROUTE 4: modify sprint: PUT "/api/sprint/modify-sprint/:sprintId". Login required

router.put('/modify-sprint/:sprintId', fetchuser , async(req, res) => {
    try {
        const {tickets} = req.body;
        const {sprintId} = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userWantToModifySprint = req.user.id;
        const user = await User.findById(userWantToModifySprint).select("-password")  

        let sprint = await Sprint.findById(sprintId)
        
        for (let i = 0; i < tickets.length; i++) {
            let tick = await Ticket.findById(tickets[i]);
            if(!tick){return res.status(404).send("Ticket not found")}
            sprint.tickets.push(tick._id);
            tick.currentSprint = sprint._id;
            tick.history.push({
                user: req.user.id,
                description: `Added To Sprint "${sprint.sprintName}"`
            })
            tick = await Ticket.findByIdAndUpdate(tickets[i], tick)
        }

        const updatedSprint = await Sprint.findByIdAndUpdate(sprintId, sprint)

        res.status(200).send({"success":"Sprint Saved Successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

// ROUTE 2: Get all sprints for specific project : GET '/api/sprint/all-sprint/:projectId" login required
router.get('/all-sprint/:projectId', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const {projectId} = req.params;

        const sprints = await Sprint.find({projectId})
        
        res.status(200).send(sprints);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred")
    }
})

// ROUTE 3: Get specific sprint for the project : GET `/api/sprint/:sprintId`
router.get('/:sprintId', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const {sprintId} = req.params;

        const sprint = await Sprint.findById(sprintId)
        if(!sprint) res.status(404).send({"result":"Sprint not found"})
      
        res.status(200).send(sprint);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred")
    }
})

router.post('/inactive-sprint/:sprintId', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const {sprintId} = req.params;

        const sprint = await Sprint.findById(sprintId)
        if(!sprint) res.status(404).send({"result":"Sprint not found"})
        
        for (let i = 0; i < sprint.tickets.length; i++) {
            let tick = await Ticket.findById(sprint.tickets[i]);
            if(!tick){return res.status(404).send("Ticket not found")}
            tick.currentSprint = null;
            tick.history.push({
                user: req.user.id,
                description: `Sprint "${sprint.sprintName}" inactivated`
            })
            tick = await Ticket.findByIdAndUpdate(sprint.tickets[i], tick)
        }
        sprint.status="Inactive"
        const updatedSprint = await Sprint.findByIdAndUpdate(sprintId, sprint)

        res.status(200).send({"success":"Sprint Inactivated"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred")
    }
})

module.exports = router;