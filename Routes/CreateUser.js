import express from "express";
const router = express.Router();
import User from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const jwtSecret="Mynameisahcbwunfuc"
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const salt =await bcrypt.genSalt(10);
    let secpassword= await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
        location: req.body.location,
      });
      res.json({ success: true, message: "user created" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "failed to create" });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "try login with correct credentials" });
      }

      const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare){
        return res
          .status(400)
          .json({ errors: "try login with correct credentials" });}
          
          const data={
            user:{
              id:userData.id,

            }
          }
      const authToken=jwt.sign(data,jwtSecret);
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "failed to login" });
    }
  }
);
export default router;
