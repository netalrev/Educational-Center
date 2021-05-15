import React from 'react';


import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';


export default function OpenZoomLink(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleClickOpen = () => {
        window.open(props.zoom, '_blank').focus();
    };

    // const handleClose = async () => {
    //     setOpen(false);
    //     await deleteSingleUser(props.id).then(alert("הסרתך התקבלה בהצלחה"));
    //     window.location.reload(false);

    // };
    // const handleCancel = () => {
    //     setOpen(false);
    // };

    return (
        <div>
            <Button startIcon={<OndemandVideoIcon></OndemandVideoIcon>} variant="outlined" color="primary" onClick={handleClickOpen}>
                כניסה לפעילות
            </Button>
            {/* <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"ביטול השתתפות בפעילות"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ?האם את\ה בטוח את\ה רוצה לבטל השתתפות
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        בטל
          </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        אשר
          </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}
