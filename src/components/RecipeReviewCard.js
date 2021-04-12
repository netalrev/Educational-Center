import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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

export default function RecipeReviewCard() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Learn how to kill"
        subheader={
          <Typography className={classes.subColor}>
            September 14, 2021
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image="https://scontent.ftlv5-1.fna.fbcdn.net/v/t31.18172-8/12244234_10205990480504628_5471790634131424414_o.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=P6WE9u9VlEYAX9W9S0R&_nc_ht=scontent.ftlv5-1.fna&oh=5d0dac16a13d826c5f15661e68cedfc9&oe=60983382"
        title="image by hahaha"
      />
      <CardContent>
        <Typography variant="body2" color="white" component="p">
          If it's up, then it's up, then it's up, then it's stuck If it's up,
          then it's up, then it's up, then it's stuck huh Up then it's up, if
          it's up, then it's stuck If it's up, then it's up, then it's up, then
          it's stuck huh
        </Typography>
      </CardContent>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Give me little something to remember (Cardi!) Tryna make love in a
            Sprinter (yeah) Quick to drop a nigga like Kemba (go) Lookin' like a
            right swipe on Tinder (woo) Shit on these hoes (shit)
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
