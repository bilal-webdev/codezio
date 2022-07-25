const User = require("../model/userSchema");
const Post = require("../model/postSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../model/key").key;
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const upload = require("../routes/utility/multimedia").single("avatar");
const mailKey = require("../app")

/** POST /users homePage Controller */
exports.homePageRoute = (req, res, next) => {
  res.status(200).json({
    message: "This is the Users HomePage !!",
  });
};

/** POST /users/signup SignUp Controller */
exports.signUpRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });

  User.findOne({
    username: username,
  })
    .then((user) => {
      if (user)
        return res.status(302).json({
          message: "User already exists!",
        });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then((user) =>
              res.status(201).json({
                message: "New User created!!!",
                user,
              })
            )
            .catch((err) =>
              res.status(500).json({
                message: "Internal Server Error!",
                error: err,
              })
            );
        });
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Internal Server Error!",
        error: err,
      })
    );
};

/** POST /users/signin SignIn Controller */
exports.signInRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  const { username, password } = req.body;
  // const newUser = new User({
  //   username,
  //   password,
  // });

  User.findOne({
    username: username,
  })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message: "User not found!",
        });

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json({ message: "Password Incorrect!!" });
          }

          if (isMatch) {
            const token = jwt.sign({ user }, jwtSecretKey, { expiresIn: 3600 });
            req.header("auth-token", token);

            res.status(200).json({
              message: "Successfully signed in!!!",
              token,
            });
          }
        })
        .catch((err) =>
          res.status(500).json({
            message: "Internal Server Error!",
            error: err,
          })
        );
    })
    .catch((err) =>
      res.status(500).json({
        message: "Internal Server Error!",
        error: err,
      })
    );
};

/** POST /users/editprofile Edit Profile Controller */
exports.editprofileRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  const { username, email, name, address, contact, about, gender } = req.body;
  const updatedUser = {
    username,
    email,
    name,
    address,
    contact,
    about,
    gender,
  };

  User.findOneAndUpdate(
    { username: req.user.username },
    { $set: updatedUser },
    { new: true, useFindAndModify: false }
  )
    .then((user) => {
      const token = jwt.sign({ user }, jwtSecretKey, { expiresIn: 3600 });
      req.header("auth-token", token);

      res.status(200).json({
        message: "User details updated successfully!!!",
        token,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Internal Server Error!",
        error: err,
      })
    );
};

/** POST /users/resetpassword Reset Password Controller */
exports.resetpasswordRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  const { oldpassword, newpassword } = req.body;

  User.findOne({
    username: req.user.username,
  })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message: "User not found!",
        });

      bcrypt.compare(oldpassword, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(203).json({ message: "Password Incorrect!!" });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newpassword, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;

            user.save();
            res.status(201).json({
              message: "Password changed successfully!!!",
              user,
            });
          });
        });
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Internal Server Error!",
        error: err,
      })
    );
};

/** POST /users/forgetpassword Forget Password Controller */
exports.forgetpasswordRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  let password = String(Math.floor(10000000 + Math.random() * 900000));

  const { email } = req.body;

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message: "User not found!",
        });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: mailKey.MAIL_USER,
          pass: mailKey.MAIL_PASS,
        },
      });

      const mailOptions = {
        from: '"Codezio Inc." <codezio.Inc@gmail.com>',
        to: req.body.email.trim(),
        subject: "Auto Generated Password",
        text: `Your New Password of Codezio is: "${password}"`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error)
          return res.status(500).json({
            message: "Internal Server Error!",
            error,
          });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;

            user.save();
            res.status(201).json({
              message: "Password recovered successfully, check your Email.",
            });
          });
        });
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Internal Server Error!",
        error: err,
      })
    );
};

/** POST /users/deleteprofile Delete Profile Controller */
exports.deleteprofileRoute = (req, res, next) => {
  User.findOneAndDelete({ username: req.user.username })
    .then((user) => {
      let arr = user.posts;
      // console.log(arr);
      if (user.avatar !== "dummy.png") {
        console.log('inside avatar');
        fs.unlinkSync(
          path.join(
            __dirname,
            "..",
            "public",
            "images",
            "uploads",
            user.avatar
          )
        );
      }
      arr.forEach((el) => {
        Post.findOneAndDelete({
          _id: el,
        })
          .then(() => Post.save())
          .catch((err) => {});
      });
      res.status(200).json({ message: "User deleted successfully!!!" });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Internal Server Error!",
        error: err,
      })
    );
};

/** POST /users/uploadimage Upload Profile Image Controller */
exports.uploadimageRoute = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) throw err;
    if (req.body.oldavatar !== "dummy.png") {
      fs.unlinkSync(
        path.join(
          __dirname,
          "..",
          "public",
          "images",
          "uploads",
          req.body.oldavatar
        )
      );
    }
    User.findOne({ username: req.user.username })
      .then((user) => {
        user.avatar = req.file.filename;
        user
          .save()
          .then((updatedImgUser) => {
            const token = jwt.sign({ user: updatedImgUser }, jwtSecretKey, {
              expiresIn: 3600,
            });
            req.header("auth-token", token);

            res.status(200).json({
              message: "Image Uploaded Successfully.",
              token,
            });
          })
          .catch((err) =>
            res.status(500).json({
              message: "Internal Server Error!",
              error: err,
            })
          );
      })
      .catch((err) =>
        res.status(500).json({
          message: "Internal Server Error!",
          error: err,
        })
      );
  });
};
