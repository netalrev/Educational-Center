import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";
import { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#d8e3e7",
    height: "18px",
    borderRadius: "10px",
  },
  barColorPrimary: {
    backgroundColor: "#132c33",
  },
})(LinearProgress);

export default function LinearDeterminate(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const timer = setInterval(() => {
    setProgress(props.score);
  }, []);

  return (
    <div className={classes.root}>
      <StyledLinearProgress
        className={classes.colorPrimary}
        variant="determinate"
        value={progress}
      />
    </div>
  );
}
