import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

//Style for root
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

//Style for Linear Progress
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
  //               Use State Initialization              //
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const timer = setInterval(() => {
    setProgress(props.score);
  }, []);

  //The react component.
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
