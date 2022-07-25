import React, { useState } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { forgetPassword } from "../../Store/Actions";

import CSSstyle from "./ForgotPassword.module.css";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import Alerts from "../Alerts/Alerts";

function ForgotPassword(props) {
  // console.log(props);

  const initialFormData = { email: "" };
  const initialFormError = { email: "" };
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
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    inputValidation();

    if (formData.email) {
    //   console.log(formData);
      props.forgetPassword(formData, props.history)
    }
  };

  return (
    <Container className={CSSstyle.box} >
      <Alerts user={props.auth} />
      <Typography variant="h4" component="h1" >Password Recovery</Typography>
      <form onSubmit={onFormSubmit}>
        <TextField
          className={CSSstyle.width}
          type="text"
          name="email"
          onChange={onFormChange}
          placeholder="Enter Registered Email"
          margin="normal"
          variant="outlined"
        />
        <br />
        <Typography color="secondary" variant="inherit" component="small">
          {error.email && !formData.email ? error.email : ""}
        </Typography>
        <br />
        <Button type="submit" variant="contained" className={CSSstyle.bgcolor}>
          {" "}
          Are You Sure ?{" "}
        </Button>
      </form>
    </Container>
  );
}

ForgotPassword.propTypes = {
  auth: propTypes.object,
  forgetPassword: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
    forgetPassword: forgetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
