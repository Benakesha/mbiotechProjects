const config = require("../config.js").getConfig(),
  logger = require("../logger"),
  jwt = require("jsonwebtoken"),
  User = require("../models/user");

module.exports = function(app, api) {
  api.post("/signup", (req, res) => {
    var newUser = {
      username: req.body.userData.username,
      email: req.body.userData.email,
      password: req.body.userData.password,
      phoneNo: req.body.userData.phoneNo,
      address: req.body.userData.address,
      pincode: req.body.userData.pincode,
      role: req.body.userData.role
    };
    User.findUserByName(newUser, (err, user) => {
      if (err) throw err;
      if (user) {
        return res.json({ success: false, message: "user already exists" });
      } else {
        User.addUser(newUser, (err, data) => {
          if (err) throw err;
          if (data) {
            return res.json({
              success: true,
              message: "user added succesfully"
            });
          }
        });
      }
    });
  });

  api.post("/login", (req, res) => {
    // console.log("i====", req.clientIp);
    var newUser = {
      email: req.body.email,
      password: req.body.password
    };
    User.findUserByEmail(newUser, (err, user) => {
      if (err) {
        return res.json({ success: false, message: "failed to login" });
      }
      if (!user) {
        return res.json({ success: false, message: "Invalid Credentials" });
      } else {
        User.comparePassword(
          newUser.password,
          user.password,
          user.salt,
          (err, matched) => {
            if (err) throw err;
            if (matched) {
              const token = jwt.sign(user.toJSON(), config.secret_key, {
                expiresIn: 86400
              });
              return res.json({
                success: true,
                token: "Bearer " + token,
                username: user.username,
                role: user.role,
                expiresIn: 86400
              });
            } else {
              return res.json({
                success: false,
                message: "Invalid Credentials"
              });
            }
          }
        );
      }
    });
  });

  api.get("/users", (req, res) => {
    User.find({}, (error, result) => {
      if (error) {
        res.json({ success: false, message: error });
      }
      if (result.length > 0) {
        res.json({ success: true, data: result });
      } else {
        res.json({ success: false, message: "no fields available" });
      }
    });
  });

  api.put("/userDelete", async (req, res) => {
    User.deleteOne({ _id: req.body.id }, function(err) {
      if (!err) {
        res.json({
          success: true,
          message: "User data deleted successfuly"
        });
      } else {
        res.json({ success: false, message: err });
      }
    });
  });
};
