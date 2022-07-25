import React, { useState } from "react";
import { Link } from "react-router-dom";
import CSSstyle from "./Signup.module.css";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { registerUser, registerLoadingTrue } from "../../Store/Actions";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

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

function Signup(props) {
  // console.log(props);
  const classes = useStyles();

  const initialFormData = { username: "", email: "", password: "" };
  const initialFormError = { username: "", email: "", password: "" };
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
    if (!formData.email) {
      setError((prevState) => ({
        ...prevState,
        email: "Email field must not be empty",
      }));
    }

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

    if (formData.username && formData.password && formData.email) {
      // console.log(formData);
      props.registerLoadingTrue();
      props.registerUser(formData, props.history);
    }
  };

  return (
    <Container component="main" style={{ marginBottom: "5em" }} maxWidth="xs">
      {props.register.loading ? <Loading /> : " "}
      <Alerts user={props.register} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={onFormSubmit} className={classes.form}>
          <TextField
            type="text"
            name="email"
            onChange={onFormChange}
            variant="outlined"
            margin="normal"
            fullWidth
            label="example@john.com"
            autoFocus
          />
          <Typography color="secondary" variant="inherit" component="small">
            {error.email && !formData.email ? error.email : ""}
          </Typography>
          <TextField
            type="text"
            name="username"
            onChange={onFormChange}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
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
            Sign Up{" "}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link className={CSSstyle.Link} to="/signin" variant="body2">
                Already have an account ? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

Signup.propTypes = {
  register: propTypes.object,
  registerUser: propTypes.func.isRequired,
  registerLoadingTrue: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  register: state.register,
});

const mapDispatchToProps = {
  registerUser: registerUser,
  registerLoadingTrue: registerLoadingTrue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
