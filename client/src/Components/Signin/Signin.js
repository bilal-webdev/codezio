import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { signUser, loginLoadingTrue } from "../../Store/Actions";
import Alerts from "../Alerts/Alerts";
import Loading from "../Loading/Loading";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import CSSstyle from "./Signin.module.css";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#ffb01f",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Signin(props) {
  // console.log(props);
  const classes = useStyles();

  const initialFormData = { username: "", password: "" };
  const initialFormError = { username: "", password: "" };
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
    if (!formData.username) {
      setError((prevState) => ({
        ...prevState,
        username: "Username field must not be empty",
      }));
    }

    if (!formData.password) {
      setError((prevState) => ({
        ...prevState,
        password: "Password field must not be empty",
      }));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    inputValidation();

    if (formData.username && formData.password) {
      props.loginLoadingTrue();
      props.signUser(formData, props.history);
    }
  };

  return (
    <Container component="main" style={{ marginBottom: "5em" }} maxWidth="xs">
      {props.auth.loading ? <Loading /> : ""}
      <Alerts user={props.auth} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={onFormSubmit} className={classes.form}>
          <TextField
            type="text"
            name="username"
            onChange={onFormChange}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            autoFocus
          />
          <Typography color="secondary" variant="inherit" component="small">
            {error.username && !formData.username ? error.username : ""}
          </Typography>
          <TextField
            type="password"
            name="password"
            onChange={onFormChange}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
          />
          <Typography color="secondary" variant="inherit" component="small">
            {error.password && !formData.password ? error.password : ""}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${classes.submit} ${CSSstyle.bgcolor}`}
          >
            {" "}
            Sign In{" "}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                className={CSSstyle.Link}
                to="/forgetpassword"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={CSSstyle.Link} to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

Signin.propTypes = {
  auth: propTypes.object,
  signUser: propTypes.func.isRequired,
  loginLoadingTrue: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loginLoadingTrue: loginLoadingTrue,
  signUser: signUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
