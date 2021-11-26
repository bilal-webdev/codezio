var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const {
  homePageRoute,
  signUpRoute,
  signInRoute,
  editprofileRoute,
  resetpasswordRoute,
  forgetpasswordRoute,
  deleteprofileRoute,
  uploadimageRoute,
} = require("../controller/userController");

const { isLoggedIn } = require("../routes/utility/verifyToken");

/**
 * @route POST /users
 * @desc Testing Home Route
 * @access Private
 */
router.post("/", isLoggedIn, homePageRoute);

/**
 * @route POST /users/signup
 * @desc Use to Register the User
 * @access Public
 */
router.post(
  "/signup",
  [
    check(
      "username",
      "Username must have atleast 4 characters, spaces are not allowed"
    )
      .isLength({
        min: 4,
      })
      .matches(/^[\S]+$/),
    check("email", "Invalid Email address").isEmail(),
    check("password", "Password must have atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  signUpRoute
);

/**
 * @route POST /users/signin
 * @desc Use to Signin the User
 * @access Public
 */
router.post("/signin", signInRoute);

/**
 * @route POST /users/editprofile
 * @desc let the user edit his/her profile details
 * @access Private
 */
router.post(
  "/editprofile",
  [
    check(
      "username",
      "Username must have atleast 4 characters, spaces are not allowed"
    )
      .isLength({
        min: 4,
      })
      .matches(/^[\S]+$/),
    check("email", "Invalid Email address").isEmail(),
    check("name", "Name must have atleast 4 characters").isLength({
      min: 4,
    }),
    check("address", "Address must have atleast 3 characters").isLength({
      min: 3,
    }),
    check("contact", "Contact must have atleast 10 characters").isLength({
      min: 10,
    }),
    check("about", "About must have atleast 4 characters").isLength({
      min: 4,
    }),
  ],
  isLoggedIn,
  editprofileRoute
);

/**
 * @route POST /users/resetpassword
 * @desc let the user reset his/her password
 * @access Private
 */
router.post(
  "/resetpassword",
  [
    check("newpassword", "Password must have atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  isLoggedIn,
  resetpasswordRoute
);

/**
 * @route POST /users/forgetpassword
 * @desc let the user sets his/her new password with the help of email
 * @access Private
 */
router.post(
  "/forgetpassword",
  [check("email", "Enter valid Email address").isEmail()],
  forgetpasswordRoute
);

/**
 * @route POST /users/deleteprofile
 * @desc let the user delete his/her Profile
 * @access Private
 */
router.post("/deleteprofile", isLoggedIn, deleteprofileRoute);

/**
 * @route POST /users/uploadimage
 * @desc let the user upload his/her Profile Picture
 * @access Private
 */
router.post("/uploadimage", isLoggedIn, uploadimageRoute);

module.exports = router;
