import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";
import { useState, useEffect } from "react";


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function LinearDeterminate(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const timer = setInterval(() => {
    setProgress(props.score);
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}