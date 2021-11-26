const User = require("../model/userSchema");
const Post = require("../model/postSchema");
const { validationResult } = require("express-validator");

/** POST /users/posts homePage Controller */
exports.homePageRoute = (req, res, next) => {
  res.status(200).json({
    message: "This is the Posts HomePage !",
  });
};

/** GET /users/posts/profile profile Controller */
exports.profileRoute = (req, res, next) => {
  User.findOne({
    username: req.user.username,
  })
    .populate("posts")
    .exec((err, user) =>
      res.status(200).json({
        message: "User's recent posts",
        user,
        // posts: user.posts,
      })
    );
};

/** GET /users/posts/timeline timeline Controller */
exports.timelineRoute = (req, res, next) => {
  Post.find()
    .populate("postedBy")
    .exec((err, posts) =>
      res.status(200).json({
        message: "All recent posts",
        posts,
      })
    );
};

/** POST /users/posts/createpost createpost Controller */
exports.createpostRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(406).json(errors.errors);

  const { postText } = req.body;
  const newPost = new Post({ postText });

  User.findOne({
    username: req.user.username,
  })
    .then((loggedinUser) => {
      newPost.postedBy = loggedinUser;
      loggedinUser.posts.push(newPost);

      loggedinUser.save().then(() => {
        newPost.save().then(() =>
          res.status(200).json({
            message: "New Post Created !",
          })
        );
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Internal Server Problem!",
        error: err,
      })
    );
};


/** POST /users/posts/postlike/:id postlike Controller */
exports.postlikeRoute = (req, res, next) => {
  User.findOne({
    username: req.user.username,
  })
    .then((loggedinUser) => {
      Post.findOne({
        _id: req.params.id,
      }).then((likedPost) => {
        if (likedPost.like.indexOf(loggedinUser._id) === -1) {
          if (likedPost.dislike.indexOf(loggedinUser._id) >= 0) {
            let userIndex = likedPost.dislike.findIndex(
              (p) => p._id === loggedinUser._id
            );
            likedPost.dislike.splice(userIndex, 1);
          }
          likedPost.like.push(loggedinUser);
        }

        likedPost.save().then(() =>
          res.status(200).json({
            message: "You liked the Post😊",
          })
        );
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Internal Server Problem!",
        error: err,
      })
    );
};


/** POST /users/posts/postdislikeRoute/:id postlike Controller */
exports.postdislikeRoute = (req, res, next) => {
    User.findOne({
      username: req.user.username,
    })
      .then((loggedinUser) => {
        Post.findOne({
          _id: req.params.id,
        }).then((dislikedPost) => {
          if (dislikedPost.dislike.indexOf(loggedinUser._id) === -1) {
            if (dislikedPost.like.indexOf(loggedinUser._id) >= 0) {
              let userIndex = dislikedPost.like.findIndex(
                (p) => p._id === loggedinUser._id
              );
              dislikedPost.like.splice(userIndex, 1);
            }
            dislikedPost.dislike.push(loggedinUser);
          }
  
          dislikedPost.save().then(() =>
            res.status(200).json({
              message: "You disliked the Post 😔",
            })
          );
        });
      })
      .catch((err) =>
        res.status(500).json({
          message: "Internal Server Problem!",
          error: err,
        })
      );
  };
  