import React from "react";

import { connect } from "react-redux";
import propTypes from "prop-types";
import { timeline, profile, likePost, dislikePost } from "../../Store/Actions";

import CSSstyle from "./Post.module.css";
import {
  Paper,
  Avatar,
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Post(props) {
  // console.log(props);
  const { post, user } = props;

  function formatDate(d) {
    let postDate = new Date(d);
    let modifiedDate =
      (postDate.getDate() < 10
        ? "0" + postDate.getDate()
        : postDate.getDate()) +
      " " +
      postDate.toLocaleString("default", { month: "short" }) +
      " " +
      postDate.getFullYear() +
      ", " +
      postDate.toLocaleTimeString();

    return modifiedDate;
  }

  const postActions = (event) => {
    if (event.target.classList.contains("fa-thumbs-up")) {
      console.log("liked", post._id);
      props.likePost(post._id);
    }

    if (event.target.classList.contains("fa-thumbs-down")) {
      console.log("disliked", post._id);
      props.dislikePost(post._id);
    }

    setTimeout(() => {
      if (user) props.fetchProfile();
      else props.fetchTimeline();
    }, 2000);
  };

  var name = (post ? post.postedBy.name : "") || (user ? user.name : "");
  var username = (post ? post.postedBy.username : "") || (user ? user.username : "");

  const prodImgPath = process.env.REACT_APP_BASE_URL || "http://localhost:3080";

  return (
    <Paper className={CSSstyle.paper} elevation={3}>
      <Container style={{ display: "flex" }}>
        <Avatar
          variant="rounded"
          className={CSSstyle.avatar}
          src={`${prodImgPath}/images/uploads/${
            user ? user.avatar : post.postedBy.avatar
          }`}
        />
        <Box className={CSSstyle.absocial}>
          <Box className={CSSstyle.social}>
            <Typography variant="inherit" component="h6">
              {post ? formatDate(post.createdAt) : " "}
            </Typography>

            <Accordion className={CSSstyle.accordian}>
              <AccordionSummary
                expandIcon={
                  <IconButton>
                    <ExpandMoreIcon />
                  </IconButton>
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              ></AccordionSummary>
              <AccordionDetails
                onClick={postActions}
                className={CSSstyle.socialContent}
              >
                <i className={`fa fa-thumbs-up ${CSSstyle.like} `}></i>
                <i className={`fa fa-thumbs-down ${CSSstyle.dislike} `}></i>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Typography
            style={{ textTransform: "capitalize" }}
            variant="body1"
            component="h6"
          >
            {name}
            {/* {post ? post.postedBy.name : ""}
            {user ? user.name : ""} */}
          </Typography>
          <Typography variant="subtitle2" component="h6">
            @{username}
            {/* {post ? post.postedBy.username : ""}
            {user ? user.username : ""} */}
          </Typography>
          <Typography variant="body2" component="h6">
            {post ? post.postText : ""}
          </Typography>
          <Typography variant="inherit" component="small">
            {post ? post.like.length : ""} Like |{" "}
            {post ? post.dislike.length : ""} Dislike
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}

Post.propTypes = {
  auth: propTypes.object,
  posts: propTypes.object.isRequired,
  fetchTimeline: propTypes.func.isRequired,
  fetchProfile: propTypes.func.isRequired,
  likePost: propTypes.func.isRequired,
  dislikePost: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  fetchTimeline: timeline,
  fetchProfile: profile,
  likePost: likePost,
  dislikePost: dislikePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
