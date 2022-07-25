import React from "react";
import { Link } from "react-router-dom";

import CSSstyle from "./Header.module.css";
import BackgroundVideo from "../../../assets/bg-video1.mp4";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import HowToReg from "@material-ui/icons/HowToReg";
import Inbox from "@material-ui/icons/Inbox";

function Header() {
  return (
    <Grid align="center" container className={CSSstyle.headerContainer}>
      <video
        className={CSSstyle.headerVideo}
        loop
        muted
        autoPlay
        src={BackgroundVideo}
      />
      <Box className={CSSstyle.headerContent}>
        <Typography variant="h4" component="h1">
          Here We Teach So You May Outreach
          <span className={CSSstyle.dot}>.</span>
        </Typography>
        <Typography variant="h6" component="h4">
          Join Codezio to code, learn, make, and discover.
        </Typography>
        
        <div className={CSSstyle.btnGroup}>
        <Button
          style={{ marginRight: "1rem" }}
          className={CSSstyle.signUpButton}
          variant="contained"
          startIcon={<HowToReg />}
        >
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/signup">
            Sign Up
          </Link>
        </Button>

        <Button
          className={CSSstyle.signUpButton}
          variant="contained"
          startIcon={<Inbox />}
        >
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/signin">
            Sign In
          </Link>
        </Button>
        </div>
        
      </Box>
    </Grid>
  );
}

export default Header;
