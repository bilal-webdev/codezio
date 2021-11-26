import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import axios from "./Utility/AxiosConfig";
import { loadUser } from "./Store/Actions";

import CSSstyle from "./App.module.css";
import Navigation from "./Components/Navigation/Navigation";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Components/LandingPage/LandingPage";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import Timeline from "./Components/Timeline/Timeline";
import Profile from "./Components/Profile/Profile";
import EditProfileForm from "./Components/EditProfileForm/EditProfileForm";
import ResetForm from "./Components/ResetForm/ResetForm";
import ForgotPassword from "./Components/ForgotPassoword/ForgotPassword";

class App extends Component {
  sessionLogin() {
    if (localStorage.token) {
      axios.defaults.headers.common["auth-token"] = localStorage.token;
      this.props.loadUser(localStorage.token);
    } else {
      delete axios.defaults.headers.common["auth-token"];
    }
  }

  componentDidMount() {
    this.sessionLogin();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <BrowserRouter>
        <div className={CSSstyle.widthHeight}>
          <Navigation />
          <Route path="/" exact component={LandingPage} />

          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/forgetpassword" component={ForgotPassword} />

            {isAuthenticated ? (
              <Fragment>
                <Route path="/timeline" component={Timeline} />
                <Route path="/profile" component={Profile} />
                <Route path="/editprofile" component={EditProfileForm} />
                <Route path="/resetpassword" component={ResetForm} />
              </Fragment>
            ) : (
              ""
            )}
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loadUser: loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
