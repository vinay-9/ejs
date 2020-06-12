const express = require("express");


const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup/", UserController.createUser);
//backend pe jab bhi hamare pass kuch server pe poszt request aayegi tab ham usercontroller.create user method ka use karenge

router.post("/login/", UserController.userLogin);
// same is the case foe loging in of the user



module.exports = router;
//then ham router ko export kar denge