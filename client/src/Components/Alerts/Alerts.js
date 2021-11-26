import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alerts(props) {
  // console.log(props);
  const classes = useStyles();
  const [state, setstate] = useState(null);

  useEffect(() => {
    setstate(props.user.errors);
    return () => {};
  }, [props.user.errors]);

  let expandErrors = [];
  if (state) {
    for (const [key, value] of Object.entries(state)) {
      expandErrors.push(
        <Alert key={key} severity="error">
          {typeof value == "string" ? value : value.msg} - {key}!
        </Alert>
      );
    }
  }

  return <div className={classes.root}>{expandErrors.map((err) => err)}</div>;
}

export default Alerts;