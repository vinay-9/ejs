const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
//exports karne hai in dono functions ko
exports.createUser = (req, res, next) =>
 {
// to create a hash password
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });

   // to save in the mongodb database
    user
    .save()//it will save the contents of the user
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = (req, res, next) =>
{
  let fetchedUser;

  //search in rhte backend forlde of mongodb
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);// return true oor false to the then function
    })//dono me check karna hai ki kadhi hamara authentication kahi fail toh nahi hua hai
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
         "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .then(result=>{
      if (!result) 
      {
                return res.status(401).json({
                message: "Auth failed"
                });
      }
    });


}
