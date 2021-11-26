import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { timeline } from "../../Store/Actions";

import CSSstyle from "./Timeline.module.css";
import { Container, Typography, Button, Divider, Box } from "@material-ui/core";
import Post from "../Post/Post";

function Timeline(props) {
  // console.log(props);
  const [posts, setposts] = useState(null);
  const [user, setuser] = useState(null);
  // console.log(user);

  useEffect(() => {
    const callTimeline = () => {
      props.fetchTimeline();
      setuser(props.auth.user);
    };

    if (!props.posts.posts && !props.posts.errors) callTimeline();

    if (props.posts.posts) {
      setposts(props.posts.posts);
      setuser(props.auth.user);
    }
    return () => {};
  }, [props]);

  useEffect(() => {
    props.fetchTimeline();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  // console.log(posts, user);

  let displayPosts;
  if (posts) {
    displayPosts = posts.map((post) => <Post key={post._id} post={post} />);
  }

  return (
    <Container>
      <Typography style={{ textTransform: "capitalize" }} variant="h4">
        Hello, {user ? user.username : ""}
        <span role="img" aria-label="hi" aria-labelledby="hi">
          👋
        </span>
      </Typography>
      <Link to="/profile" style={{ textDecoration: "none" }}>
      <Button type="submit" variant="contained" className={CSSstyle.bgcolor}>
        What Is In Your Mind
      </Button>
      </Link>
      <Divider style={{ margin: "1em 0" }} />
      <Typography variant="h5">Trending Posts</Typography>
      <Box className={CSSstyle.posts}>
        {displayPosts ? (
          displayPosts
        ) : (
          <Typography align="center" color="secondary" variant="body1">
            Loading...
          </Typography>
        )}
      </Box>
    </Container>
  );
}

Timeline.propTypes = {
  auth: propTypes.object,
  posts: propTypes.object.isRequired,
  fetchTimeline: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  fetchTimeline: timeline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
