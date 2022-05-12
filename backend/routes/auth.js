const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "Bjismy$god";
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//Router1: craete a user using : POST "/api/auth/". its does not require auth


router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "password atleast 5 character").isLength({ min: 7 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check wheather the user email is exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "sorry this email is already exist" });
      }

      const salt = await bcrypt.genSalt(10);

      const securePassword = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      // if comes  some error its return Bad request

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //res.json(user);
      success = true;
      res.json({success , authtoken });
      // catch errors
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error Occured");
    }
  }
);
// Router 2: Authenticate a user using : POST "/api/auth/login". its does not required login
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password can not blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "please login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //res.json(user);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);
// Router 3 : getting user detail : POST "/api/auth/get user detail". required login
router.post("/getuser", fetchuser, async (req, res) => {
  try {
   userId = req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user)
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

module.exports = router;
