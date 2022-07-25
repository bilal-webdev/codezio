var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const {
  homePageRoute,
  profileRoute,
  timelineRoute,
  createpostRoute,
  postlikeRoute,
  postdislikeRoute
} = require("../controller/postController");

const { isLoggedIn } = require("./utility/verifyToken");

/**
 * @route POST /users/posts/
 * @desc Testing Home Route
 * @access Private
 */
router.post("/", isLoggedIn, homePageRoute);

/**
 * @route GET /users/posts/profile
 * @desc User's details with all recent posts
 * @access Private
 */
router.get("/profile", isLoggedIn, profileRoute);

/**
 * @route GET /users/posts/timeline
 * @desc Show all recent Posts
 * @access Private
 */
router.get("/timeline", isLoggedIn, timelineRoute);

/**
 * @route POST /users/posts/createpost
 * @desc let the user create the post
 * @access Private
 */
router.post(
  "/createpost",
  [
    check("postText", "Post must have atleast 10 characters").isLength({
      min: 10,
    }),
  ],
  isLoggedIn,
  createpostRoute
);

/**
 * @route POST /users/posts/postlike/:id
 * @desc let the user like any post
 * @access Private
 */
router.post("/postlike/:id", isLoggedIn, postlikeRoute);

/**
 * @route POST /users/posts/postdislike/:id
 * @desc let the user dislike any post
 * @access Private
 */
router.post("/postdislike/:id", isLoggedIn, postdislikeRoute);

module.exports = router;
