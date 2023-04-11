const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "Thisisagoodapplication"


// ROUTE:1 create a User using: POST "/api/auth/register". no login required
router.post('/register', [
    body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of atleast 8 character').isLength({ min: 5 })
  ], async(req, res) => {
  let success=false;
  // if upper conditions are not matched throw the bad request with the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try{
    let user = await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({success, error: "User with this email is already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data = {
      user: {
        id: user.id,
        email: user.email
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken})   
  }catch(error){
    console.error(error.message);
    res.status(500).send(success, "Internal Server Error Occured")
  }
})


// ROUTE:2 Authenticate a User using: POST "/api/auth/login". no login required
router.post('/login', [
body('email', 'Enter a valid email').isEmail(),
body('password', 'Password cannot be empty').exists()
], async(req, res) => {

const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const {email, password} = req.body;
try{
    let user = await User.findOne({email});
    let success = false;
    if(!user){
    return res.status(400 ).json({success, error: "Try to login with correct credentials"})
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
    return res.status(400 ).json({success, error: "Try to login with correct credentials"})
    }

    const data = {
    user: {
        id: user.id
    }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken, name: user.name}) 

}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured")
}

})


// ROUTE 3: Get logged in user details using: POST "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, async(req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")  
      res.send(user);
    } catch (error) {
    console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }

})

// ROUTE 4: Get all user name and email using: GET "/api/auth/get-all-user". Login required
router.get('/get-all-user', fetchuser, async(req, res) => {
  try {
    const user = await User.find().select("-password -_id -date -__v")  
    res.send(user);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internal Server Error Occured")
  }

})


module.exports = router;
