  import React, { useState } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { TextField, Button, Typography, Container } from "@material-ui/core";
import CSSstyle from "./ResetForm.module.css";

import { resetPassword } from "../../Store/Actions/signinAction";
import Alerts from "../Alerts/Alerts";

function ResetForm(props) {
  // console.log(props);

  const initialFormData = { oldpassword: "", newpassword: "" };
  const initialFormError = { oldpassword: "", newpassword: "" };
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
    if (!formData.oldpassword) {
      setError((prevState) => ({
        ...prevState,
        oldpassword: "Old Pasword field must not be empty",
      }));
    }

    if (!formData.newpassword) {
      setError((prevState) => ({
        ...prevState,
        newpassword: "New Password field must not be empty",
      }));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    inputValidation();

    if (formData.oldpassword && formData.newpassword) {
      // console.log(formData);
      props.resetPassword(formData, props.history);
    }
  };
  return (
    <Container className={CSSstyle.main}>
      <Alerts user={props.auth} />
      <Typography variant="h4" component="h1">Reset Password</Typography>
      <form onSubmit={onFormSubmit}>
        <TextField
          className={CSSstyle.width}
          type="password"
          name="oldpassword"
          placeholder="Old Password"
          margin="normal"
          variant="outlined"
          onChange={onFormChange}
        />
        <Typography color="secondary" variant="inherit" component="small">
          {error.oldpassword && !formData.oldpassword ? error.oldpassword : ""}
        </Typography>
        <br />
        <TextField
          className={CSSstyle.width}
          type="password"
          name="newpassword"
          placeholder="New Password"
          margin="normal"
          variant="outlined"
          onChange={onFormChange}
        />
        <br />
        <Typography color="secondary" variant="inherit" component="small">
          {error.newpassword && !formData.newpassword ? error.newpassword : ""}
        </Typography>
        <br />
        <Button variant="contained" type="submit" className={CSSstyle.bgcolor}>
          {" "}
          I'm Ready{" "}
        </Button>
      </form>
    </Container>
  );
}

ResetForm.propTypes = {
  auth: propTypes.object,
  resetPassword: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  resetPassword: resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetForm);
