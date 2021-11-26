import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { logoutUser, timeline, profile } from '../../Store/Actions';

import CSSstyle from "./Navigation.module.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Timeline from "@material-ui/icons/Timeline";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Settings from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // title: {
  //   display: "none",
  //   [theme.breakpoints.up("sm")]: {
  //     display: "block",
  //   },
  // },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Navigation(props) {
  // console.log(props);
  const { isAuthenticated } = props.auth;

  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const loggingout = () => {
    props.logoutUser();
    handleMenuClose();
    props.history.push('/');
  };

  const gotoProfile = () => {
    props.profile();
    handleMenuClose();
    props.history.push('/profile');

  };

  const gotoTimeline = () => {
    props.timeline();
    handleMenuClose();
    props.history.push('/timeline');

  };

  const gotoSetting = () => {
    props.profile();
    handleMenuClose();
    props.history.push('/editprofile');
    
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={gotoTimeline}>
        <IconButton title="Timeline" color="inherit">
          <Timeline />
        </IconButton>
        <p>Timeline</p>
      </MenuItem>
      <MenuItem onClick={gotoProfile}>
        <IconButton title="Profile" color="inherit">
          <VerifiedUser />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={loggingout}>
        <IconButton title="Logout" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
      <MenuItem onClick={gotoSetting}>
        <IconButton title="Settings" color="inherit">
          <Settings />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={CSSstyle.backgroundColor}>
        <Toolbar>
          <Typography className={CSSstyle.title} variant="h6" noWrap>
            <Link className={CSSstyle.Link} to={isAuthenticated ? '/timeline' : '/'}>
              Codezio
            </Link>
          </Typography>
          <div className={classes.grow} />

          { isAuthenticated ? <div className={classes.sectionDesktop}>
            <IconButton onClick={gotoTimeline} title="Timeline" color="inherit">
              <Timeline />
            </IconButton>
            <IconButton onClick={gotoProfile} title="Profile" color="inherit">
              <VerifiedUser />
            </IconButton>
            <IconButton onClick={loggingout} title="Logout" color="inherit">
              <AccountCircle />
            </IconButton>
            <IconButton onClick={gotoSetting} title="Settings" color="inherit">
              <Settings />
            </IconButton>
          </div> : '' }
          

          { isAuthenticated ? <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> : '' }
          
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}


Navigation.propTypes = {
  auth: propTypes.object.isRequired,
  logoutUser: propTypes.func.isRequired,
  profile: propTypes.func.isRequired,
  timeline: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logoutUser: logoutUser,
  profile: profile,
  timeline: timeline
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));