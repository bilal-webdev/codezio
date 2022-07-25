import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import propTypes from "prop-types";

import CSSstyle from "./Profile.module.css";
import {
  Container,
  Typography,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import EditProfileHeader from "../EditProfileHeader/EditProfileHeader";
import Post from "../Post/Post";
import { profile, createPost } from "../../Store/Actions";
import Alerts from "../Alerts/Alerts";

function Profile(props) {
  // console.log(props);
  const [posts, setposts] = useState(null);
  const [user, setuser] = useState(null);
  // console.log(user);

  const initialFormData = { postText: "" };
  const initialFormError = { postText: "" };
  const [formData, setformData] = useState(initialFormData);
  const [error, setError] = useState(initialFormError);

  const onFormChange = (e) => {
    e.persist();
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const inputValidation = () => {
    if (!formData.postText) {
      setError((prevState) => ({
        ...prevState,
        postText: "Field must not be empty",
      }));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    inputValidation();

    if (formData.postText) {
      // console.log(formData);
      props.createPost(formData);

      setTimeout(() => {
        if (props.posts.errors || !props.posts.errors) {
          props.fetchProfile();
        }
      }, 2000);
    }
  };

  useEffect(() => {
    const callProfile = () => {
      props.fetchProfile();
      setuser(props.auth.user);
    };

    if (!props.posts.posts && !props.posts.errors) callProfile();

    if (props.posts.posts) {
      setposts(props.posts.posts);
      setuser(props.auth.user);
    }
    return () => {};
  }, [props]);

  useEffect(() => {
    props.fetchProfile();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  // console.log(posts, user);

  let displayPosts;
  let displayHeader;
  if (posts) {
    displayPosts = posts.map((post) => (
      <Post key={post._id} post={post} user={user} />
    ));
    displayHeader = <EditProfileHeader user={user} posts={posts} />;
  }

  return (
    <Container>
      {displayHeader}
      <Typography className={CSSstyle.thin} variant="h6">
        Change the world with your thoughts...
      </Typography>
      <Alerts user={props.posts} />
      <form onSubmit={onFormSubmit}>
        <TextField
          type="text"
          name="postText"
          onChange={onFormChange}
          placeholder="Your thoughts..."
          multiline
          fullWidth
          margin="normal"
          rows={3}
          variant="outlined"
        />
        <Typography color="secondary" variant="inherit" component="small">
          {error.postText && !formData.postText ? error.postText : ""}
        </Typography>
        <br />
        <br />
        <Button type="submit" variant="contained" className={CSSstyle.bgcolor}>
          {" "}
          Show The World{" "}
        </Button>
      </form>
      <Divider style={{ margin: "1em 0" }} />
      <Typography variant="h6" color="textSecondary">
        Personal Timeline
      </Typography>
      {displayPosts ? (
        displayPosts
      ) : (
        <Typography align="center" color="secondary" variant="body1">
          Loading...
        </Typography>
      )}
    </Container>
  );
}

Profile.propTypes = {
  auth: propTypes.object,
  posts: propTypes.object.isRequired,
  fetchProfile: propTypes.func.isRequired,
  createPost: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  fetchProfile: profile,
  createPost: createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
