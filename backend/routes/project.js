const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const { ResultWithContext } = require('express-validator/src/chain');


// ROUTE 1: Create a new project: POST '/api/project/create-project' login required
router.post('/create-project', fetchuser, [
    body('projectName', 'Enter a valid project-name of atleast 2 character').isLength({ min: 2 })
], async (req, res) => {
    try {
        const {projectName} = req.body;
        // if upper conditions are not matched throw the bad request with the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newProject = new Project({
            projectName, description: req.body.description , admin: req.user.id, createdBy: req.user.id
        })
        const savedProject = await newProject.save();
        res.status(200).send(savedProject);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

// ROUTE 2: add member to the admin or development list in project: POST '/api/project/modify-project' login required
router.put('/modify-project', fetchuser, [
    body('projectName', 'Enter a valid project-name of atleast 2 character').isLength({ min: 2 })
], async (req, res) => {
    try {
        const {projectName, description} = req.body;
        // if upper conditions are not matched throw the bad request with the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        let project = await Project.findOne({projectName});
        
        if(!project){
            return res.status(404).send("Project with this name does not exist");
        }

        if(!project.admin.includes(req.user.id)){
            return res.status(401).send("Not authorised to make changes");
        }

        if(description){
            const updatedProject = await Project.findByIdAndUpdate(project._id, {description});
        }

        let newAdmin = project.admin;
        let newDevelopers = project.developers;

        for (let index = 0; index < req.body.admin.length; index++) {
            const element = req.body.admin[index];
            let userData = await User.findOne({email: element});
            let elementId = userData._id;
            if(!newAdmin.includes(elementId)){
                newAdmin.push(elementId)
            }
            if(index+1 === req.body.admin.length){
                const updatedProject = await Project.findByIdAndUpdate(project._id, {$set: {admin: newAdmin}})
            }
        }

        for (let index = 0; index < req.body.developers.length; index++) {
            const element = req.body.developers[index];
            let userData = await User.findOne({email: element});
            let elementId = userData._id;
            if(!newDevelopers.includes(elementId)){
                newDevelopers.push(elementId)
            }
            if(index+1 === req.body.developers.length){
                const updatedProject = await Project.findByIdAndUpdate(project._id, {$set: {developers: newDevelopers}})
            }
        }

        // delete the admin and developers
        // project = await Project.findOne({projectName});

        // newAdmin = project.admin;
        // newDevelopers = project.developers;

        // for (let index = 0; index < req.body.removeAdmin.length; index++) {
        //     const element = req.body.removeAdmin[index];
        //     let userData = await User.findOne({email: element});
        //     let elementId = userData._id;
        //     if(project.createdBy !== elementId){
        //         const i = newAdmin.indexOf(elementId);
        //         if(i>-1){newAdmin.splice(i, 1);}
        //     }
        //     if(index+1 === req.body.removeAdmin.length){
        //         const updatedProject = await Project.findByIdAndUpdate(project._id, {$set: {admin: newAdmin}})
        //     }
        // }

        // for (let index = 0; index < req.body.removeDevelopers.length; index++) {
        //     const element = req.body.removeDevelopers[index];
        //     let userData = await User.findOne({email: element});
        //     let elementId = userData._id;
        //     const i = newDevelopers.indexOf(elementId);
        //     if(i>-1){newDevelopers.splice(i, 1);}
        //     if(index+1 === req.body.removeDevelopers.length){
        //         const updatedProject = await Project.findByIdAndUpdate(project._id, {$set: {developers: newDevelopers}})
        //     }
        // }


        res.status(200).send(await Project.findById(project.id));

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

// ROUTE 3: Get project: GET '/api/project/get-project' login required
router.get('/get-project', fetchuser, [
    body('projectName', 'Enter a valid project-name of atleast 2 character').isLength({ min: 2 })
], async (req, res) => {
    try {
        const {projectName} = req.body;
        // if upper conditions are not matched throw the bad request with the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const project = await Project.findOne({projectName});
        if(!project){return res.status(404).send("Project does not exist")}

        let userWantToFetch = req.user.id;
        if(!project.admin.includes(userWantToFetch) && !project.developers.includes(userWantToFetch)){
            return res.status(401).send("Not Allowed")
        }

        res.status(200).send(project);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

// ROUTE 3.1: Get all projects for specific user he is involved in : GET '/api/project/get-all-projects' login required
router.get('/get-all-projects', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await Project.find({ $or : [
            {admin: { $in : userId }},
            {developers: { $in : userId }}
        ]  });

        res.status(200).send(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

// ROUTE 4: delete project: DELETE '/api/project/delete-project' login required
router.delete('/delete-project', fetchuser, [
    body('projectName', 'Enter a valid project-name of atleast 2 character').isLength({ min: 2 })
], async (req, res) => {
    try {
        const {projectName} = req.body;
        // if upper conditions are not matched throw the bad request with the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const project = await Project.findOne({projectName});
        if(!project){return res.status(404).send("Project does not exist")}

        let userWantToDelete = req.user.id;
        if(!project.admin.includes(userWantToDelete)){
            return res.status(401).send("Not Allowed")
        }
        const deletedTickets = await Ticket.deleteMany({projectName: project._id})
        const deletedProject =  await Project.findByIdAndDelete(project.id);

        res.status(200).send("Project and all relavent tickets deleted Successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})


///////////////////////////////TICKETS///////////////////////////////////

// ROUTE 1: Create ticket for a particular project: POST '/api/project/create-ticket' login required
router.post('/create-ticket', fetchuser, [
    body('projectName', 'Enter a valid project-name of atleast 2 character').isLength({ min: 2 }),
    body('createdBy', 'Enter a valid project-name of atleast 2 character').isLength({ min: 2 }),
    body('assignedTo', 'Enter a valid project-name of atleast 2 character').isLength({ min: 2 })
], async (req, res) => {
    try {
        const {projectName, title, description, createdBy, assignedTo, ticketType} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let projectObject = await Project.findOne({projectName});
        let createdByObject = await User.findOne({email: createdBy});
        let assignedToObject = await User.findOne({email: assignedTo});
        if(!projectObject){return res.status(404).send("Project Not Found")}
        if(!createdByObject){return res.status(404).send("Created by (User) is not found")}
        if(!assignedToObject){return res.status(404).send("Assigned to (User) is not found")}
        // if upper conditions are not matched throw the bad request with the errors
        

        let ticketNumber = projectName+'_'+projectObject.nextTicketNumber;
        
        let exist = await Ticket.findOne({ticketNumber});
        if(exist){return res.status(400).send('Ticket Number is already existed')}

        const newTicket = new Ticket({
            ticketNumber, projectName: projectObject._id, title,  description, createdBy:createdByObject._id, assignedTo: assignedToObject._id, ticketType
        })
        let newTicketNumber = projectObject.nextTicketNumber+1;
        const updatedProject = await Project.findByIdAndUpdate(projectObject._id, { nextTicketNumber: newTicketNumber});
        const savedTicket = await newTicket.save();
        res.status(200).send(savedTicket)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

// ROUTE 2: Delete ticket for a particular project: DELETE '/api/project/delete-ticket' login required
router.delete('/delete-ticket/:id', fetchuser
, async (req, res) => {
    try {
        let ticket = await Ticket.findOne({ticketNumber: req.params.id});

        if(!ticket) {return res.status(404).send("Ticket Not Found")}
        if(ticket.createdBy.toString() !== req.user.id) {return res.status(401).send("Not Allowed")}
        
        let deleted = await Ticket.findByIdAndDelete(ticket._id);
        res.status(200).send("Deleted Successfully")

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

// ROUTE 3: GET get the ticket for a particular project: GET '/api/project/get-ticket/:id' login required
router.get('/get-ticket/:id', fetchuser
, async (req, res) => {
    try {
        let ticket = await Ticket.findOne({ticketNumber: req.params.id});
        if(!ticket) {return res.status(404).send("Ticket Not Found")}
        
        let userWantToDelete = req.user.id;
        let project = await Project.findById(ticket.projectName)
        if(!project){return res.status(600).send("Database Error")}

        if(!project.admin.includes(userWantToDelete) && !project.developers.includes(userWantToDelete)){
            return res.status(401).send("Not Allowed")
        }
        
        let getTicket =  await Ticket.findById(ticket.id)
        res.status(200).send(getTicket)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

// ROUTE 4: Update ticket for a particular project: PUT '/api/project/modify-ticket/:id' login required
router.put('/modify-ticket/:id', fetchuser, async (req, res) => {
    try {
        const {projectName, title, description, createdBy, assignedTo, ticketType} = req.body;
        let ticket = await Ticket.findOne({ticketNumber: req.params.id});
        if(!ticket) {return res.status(404).send("Ticket Not Found")}
        let userWantToModify = req.user.id;
        let project = await Project.findById(ticket.projectName)
        if(!project){return res.status(600).send("Database Error")}

        if(!project.admin.includes(userWantToModify) && !project.developers.includes(userWantToModify)){
            return res.status(401).send("Not Allowed")
        }

        // found the ticket and allowed to modify the ticket
        if(title){ticket.title = title;}
        if(description){ticket.description = description;}
        if(ticketType){ticket.ticketType = ticketType;}
        if(assignedTo){
            let assignedToObject = await User.findOne({email: assignedTo});
            if(!assignedToObject){return res.status(404).send("Assigned-to user does not exist")}
            let assignedToUserId = assignedToObject._id;
            if(!project.admin.includes(assignedToUserId) && !project.developers.includes(assignedToUserId)){
                return res.status(401).send("Assigned-to user is not a part of this PROJECT")
            }
            ticket.assignedTo = assignedToUserId;
        }
        
        let newTicket = await Ticket.findByIdAndUpdate(ticket.id, ticket);
        newTicket = await Ticket.findById(ticket.id);
        res.status(200).send(newTicket)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

// ROUTE 5: GET all ticket for a particular project: GET '/api/project/get-all-tickets' login required
router.get('/get-all-tickets', fetchuser
, async (req, res) => {
    try {
        const {projectName} = req.body;
        let userWantToFetchAllTicket = req.user.id;
        let project = await Project.findOne({projectName})
        if(!project){return res.status(600).send("Project with this name does not exist")}

        if(!project.admin.includes(userWantToFetchAllTicket) && !project.developers.includes(userWantToFetchAllTicket)){
            return res.status(401).send("Not Allowed")
        }
        
        let tickets =  await Ticket.find({projectName:project.id})
        res.status(200).send(tickets)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
})

module.exports = router;