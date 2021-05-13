import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import "./RecipeReviewCard.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
const useStyles1 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "#4d0000",
      color: "white",
    },
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    text: "white",
    borderRadius: "4%",
    right: 0,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },

  media: {
    height: 0,
    color: "white",
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    color: "red", //arrow color

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
    color: "red",
  },
  avatar: {
    backgroundColor: red[500],
    color: "white",
  },
  subColor: {
    color: "red",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={<h1 className="title__h1">{props.title}</h1>}
        subheader={
          <Typography className={classes.subColor}>
            ע"י: {props.owner}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image="https://www.gallosconflow.com/wp-content/uploads/2020/06/donde-ver-batalla-de-gallos-sara-socas-vs-rapder.jpg"
        title="image by hahaha"
      />
      <CardContent></CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="register">
          <Button variant="contained" className={classes1.button}>
            הרשמה
          </Button>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <Typography variant="body2" color="white" component="p">
              <p>מספר מפגשים: {props.activityCount}</p>
              <p>:תאריכים</p>
              {props.dates.map((date) => {
                return <p>{date}</p>;
              })}
            </Typography>
            {props.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
