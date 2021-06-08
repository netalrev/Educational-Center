import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import ActivitySummary from "./ActivitySummary";

export default function WatchActivitySummary(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button
                variant="outlined"
                style={{
                    backgroundColor: "#51c4d3",
                    border: "3px solid #51c4d3",
                    color: "#d8e3e7",
                    maxHeight: "40px",
                    paddingBottom: "15px",
                    borderRadius: "10px",

                }}
                onClick={handleClickOpen}
            >
                מידע נוסף
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
                    <b style={{ color: "#132c33" }}>מידע נוסף עבור {props.title}</b>
                </DialogTitle>
                <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
                    <DialogContentText
                        style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
                    >
                        <ActivitySummary
                            groupName={props.groupName}
                            dates={props.dates}
                            activity_id={props.activity_id}
                            email={props.email}
                            howManyPass={props.howManyPass}
                            type={props.type}
                            title={props.title}
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
