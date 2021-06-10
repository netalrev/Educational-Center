import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import UserProgressCard from "./UserProgressCard";

export default function WatchUserActivityProgress(props) {

    //               Use State Initialization              //

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    //               Handler Function              //

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    //The react component with style in tags.
    return (
        <div>
            <Button
                variant="outlined"
                style={{
                    fill: "rgba(3, 3, 3, 0.5)",
                    backgroundColor: "green",
                    maxHeight: "40px",
                    paddingBottom: "15px",
                    border: "3px solid green",

                }}
                onClick={handleClickOpen}
            >
                צפייה במשובים
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
                style={{ backgroundColor: "rgba(3, 3, 3, 0.5)" }}
            >
                <DialogTitle
                    id="responsive-dialog-title"
                    style={{ backgroundColor: "#d8e3e7" }}
                >
                    <b style={{ color: "#132c33" }}>משובים עבור - {props.name}</b>
                </DialogTitle>
                <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
                    <DialogContentText
                        style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
                    >
                        <UserProgressCard
                            groupName={props.groupName}
                            date={props.date}
                            students={props.students}
                            id={props.id}
                            email={props.email}
                            style={{ backgroundColor: "black" }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ backgroundColor: "#d8e3e7" }}>
                    <Button
                        autoFocus
                        onClick={handleCancel}
                        style={{
                            backgroundColor: "#132c33", maxHeight: "40px",
                            paddingBottom: "15px", borderRadius: "10px"
                        }}
                    >
                        חזרה
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
