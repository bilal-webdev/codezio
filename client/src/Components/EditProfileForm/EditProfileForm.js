import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import propTypes from "prop-types";

import { profile, editUser, deleteUser, logoutUser } from "../../Store/Actions";

import CSSstyle from "./EditProfileForm.module.css";
import {
  Typography,
  TextField,
  Container,
  Divider,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import RestoreTwoTone from "@material-ui/icons/RestoreTwoTone";
import EditProfileHeader from "../EditProfileHeader/EditProfileHeader";
import Alerts from "../Alerts/Alerts";

function EditProfileForm(props) {
  // console.log(props);

  const initStateErr = {
    username: "",
    email: "",
    name: "",
    address: "",
    contact: "",
    about: "",
    gender: "",
  };
  const [user, setuser] = useState(null);
  const [, setposts] = useState(null);
  const [error, setError] = useState(initStateErr);

  useEffect(() => {
    let initState = {
      username: "",
      email: "",
      name: "",
      address: "",
      contact: "",
      about: "",
      gender: "male",
    };
    setuser({ ...initState, ...props.auth.user });
    return () => {};
  }, [props.auth.user]);

  if (props.posts.posts === null) {
    props.fetchProfile();

    setTimeout(() => {
      setposts(props.posts.posts);
    }, 2000);
  }

  let displayHeader;
  if (user)
    displayHeader = <EditProfileHeader user={user} posts={props.posts.posts} />;

  const onFormChange = (e) => {
    e.persist();
    setuser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const inputValidation = () => {
    if (!user.username) {
      setError((prevState) => ({
        ...prevState,
        username: "Username field must not be empty",
      }));
    }

    if (!user.email) {
      setError((prevState) => ({
        ...prevState,
        email: "Email field must not be empty",
      }));
    }

    if (!user.name) {
      setError((prevState) => ({
        ...prevState,
        name: "Name field must not be empty",
      }));
    }

    if (!user.address) {
      setError((prevState) => ({
        ...prevState,
        address: "Address field must not be empty",
      }));
    }

    if (!user.contact) {
      setError((prevState) => ({
        ...prevState,
        contact: "Contact field must not be empty",
      }));
    }

    if (!user.about) {
      setError((prevState) => ({
        ...prevState,
        about: "About field must not be empty",
      }));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    inputValidation();

    if (
      user.username &&
      user.email &&
      user.name &&
      user.address &&
      user.contact &&
      user.about
    ) {
      // console.log(user);
      props.editUser(user);
      props.fetchProfile();
    }
  };

  const onDeleteUser = () => {
    if (window.confirm("Do you want to delete your account ?")) {
      // console.log("Account deleted!!!");
      props.deleteUser(props.history);
    }
  };

  const loggingout = () => {
    props.logoutUser();
    props.history.push('/');
  };

  return (
    <Container className={CSSstyle.center}>
      <Typography variant="h4">Edit Profile Details...</Typography>
      {displayHeader}
      <div style={{ textAlign: "center" }}>
        <Button
          style={{ margin: "0 1em 1em 0 " }}
          variant="contained"
          startIcon={<RestoreTwoTone />}
          className={CSSstyle.bgcolor}
        >
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            to="/resetpassword"
          >
            Reset Password
          </Link>
        </Button>

        <Button
          style={{ marginBottom: "1em" }}
          variant="contained"
          startIcon={<Delete />}
          className={CSSstyle.bgcolor}
          onClick={onDeleteUser}
        >
          Delete Profile
        </Button>
      </div>

      <Divider style={{ marginBottom: "1em" }} />
      <Typography variant="h5">Profie Details...</Typography>
      <form onSubmit={onFormSubmit}>
        <TextField
          type="text"
          name="username"
          label="Username"
          onChange={onFormChange}
          value={user ? user.username : ""}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Typography color="secondary" variant="inherit" component="small">
          {error.username && !user.username ? error.username : ""}
        </Typography>

        <TextField
          type="text"
          name="name"
          label="Full Name"
          onChange={onFormChange}
          value={user ? user.name : ""}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Typography color="secondary" variant="inherit" component="small">
          {error.name && !user.name ? error.name : ""}
        </Typography>

        <TextField
          type="text"
          name="email"
          label="example@email.com"
          onChange={onFormChange}
          value={user ? user.email : ""}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Typography color="secondary" variant="inherit" component="small">
          {error.email && !user.email ? error.email : ""}
        </Typography>

        <TextField
          type="text"
          name="address"
          label="Address"
          onChange={onFormChange}
          value={user ? user.address : ""}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Typography color="secondary" variant="inherit" component="small">
          {error.address && !user.address ? error.address : ""}
        </Typography>

        <TextField
          type="text"
          name="contact"
          label="Contact"
          onChange={onFormChange}
          value={user ? user.contact : ""}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Typography color="secondary" variant="inherit" component="small">
          {error.contact && !user.contact ? error.contact : ""}
        </Typography>

        <TextField
          type="text"
          name="about"
          label="Tell us about you"
          onChange={onFormChange}
          value={user ? user.about : ""}
          multiline
          rows={3}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Typography color="secondary" variant="inherit" component="small">
          {error.about && !user.about ? error.about : ""}
        </Typography>

        <RadioGroup
          row
          //   defaultChecked={user ? user.gender : "male"}
          aria-label="gender"
          name="customized-radios"
        >
          <FormControlLabel
            checked={user && user.gender === "male" ? true : false}
            name="gender"
            value="male"
            onChange={onFormChange}
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            checked={user && user.gender === "female" ? true : false}
            name="gender"
            value="female"
            onChange={onFormChange}
            control={<Radio />}
            label="Female"
          />
        </RadioGroup>
        <Alerts user={props.auth} />
        <Button type="submit" variant="contained" className={CSSstyle.bgcolor}>
          {" "}
          Submit Details{" "}
        </Button>

        <Button
          type="reset"
          variant="contained"
          style={{ margin: "1em 1em" }}
          onClick={loggingout}
        >
          Logout
        </Button>
      </form>
    </Container>
  );
}

EditProfileForm.propTypes = {
  auth: propTypes.object,
  posts: propTypes.object.isRequired,
  fetchProfile: propTypes.func.isRequired,
  editUser: propTypes.func.isRequired,
  deleteUser: propTypes.func.isRequired,
  logoutUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  fetchProfile: profile,
  editUser: editUser,
  deleteUser: deleteUser,
  logoutUser: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);
