import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { createPendingActivities } from "../../graphql/mutations";
import { listPendingActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import swal from "sweetalert";

export default function UploadResponsiveDialog(props) {

  //               Use State Initialization              //

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [pendingActivities, setPendingActivitiess] = useState([]);

  //               Use Effect Initialization              //

  useEffect(() => {
    fetchPendingActivities();
  }, []);

  //               Functions              //

  var dates_class = {
    convert: function (d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp)
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return d.constructor === Date
        ? d
        : d.constructor === Array
          ? new Date(d[0], d[1], d[2])
          : d.constructor === Number
            ? new Date(d)
            : d.constructor === String
              ? new Date(d)
              : typeof d === "object"
                ? new Date(d.year, d.month, d.date)
                : NaN;
    },
    compare: function (a, b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return isFinite((a = this.convert(a).valueOf())) &&
        isFinite((b = this.convert(b).valueOf()))
        ? (a > b) - (a < b)
        : NaN;
    },
    inRange: function (d, start, end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
      return isFinite((d = this.convert(d).valueOf())) &&
        isFinite((start = this.convert(start).valueOf())) &&
        isFinite((end = this.convert(end).valueOf()))
        ? start <= d && d <= end
        : NaN;
    },
  };
  var tzoffset_start = new Date().getTimezoneOffset() * 60000;
  var tzoffset_end = new Date().getTimezoneOffset() * 60000 - 60 * 60000;
  var current_time = dates_class.convert(
    new Date(Date.now() - tzoffset_start).toISOString().substring(0, 16)
  );
  var current_time_20 = dates_class.convert(
    new Date(Date.now() - tzoffset_end).toISOString().substring(0, 16)
  );

  //async function to fetch pending activities.
  const fetchPendingActivities = async () => {
    try {
      const activitiesData = await API.graphql(
        graphqlOperation(listPendingActivitiess)
      );
      const activitiesList = activitiesData.data.listPendingActivitiess.items;
      setPendingActivitiess(activitiesList);
    } catch (error) {
      console.log("error on fetching songs", error);
    }
  };

  //This function validate URL Link.
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  //This function validate email address.
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //Function for check if the new/edit activity is valid bedore update the DB. 
  function validation() {
    if (
      document.getElementsByName("name")[0].value > 100 ||
      document.getElementsByName("name")[0].value === ""
    )
      return "שם הקורס אינו תקין, יכול להכיל עד 100 תווים";
    else if (
      !validURL(document.getElementsByName("activity_img")[0].value) &&
      document.getElementsByName("activity_img")[0].value !== ""
    )
      return "קישור לתמונה אינו תקין, יש לנסות קישור אחר";
    else if (document.getElementById("zoomCheckBox").checked) {
      if (document.getElementsByName("activity_zoom")[0].value !== "")
        if (!validURL(document.getElementsByName("activity_zoom")[0].value))
          return "קישור לזום אינו תקין";
    }
    if (
      !document.getElementsByName("activityCount")[0].value ||
      document.getElementsByName("activityCount")[0].value < 1 ||
      document.getElementsByName("activityCount")[0].value === ""
    )
      return "יש להכניס לפחות מפגש אחד";
    var date_map = Array.from(document.getElementsByName("dates")).map(
      (date) => date.value
    );
    var current_time = props.currentTime;
    var temp;
    for (var i = 0; i < date_map.length; i++) {
      temp = dates_class.convert(date_map[i]);
      if (dates_class.compare(current_time, temp) == 1) return "יש להכניס מועד עתידי";
    }
    if (
      document.getElementsByName("activity_description")[0].value.length < 10 ||
      document.getElementsByName("activity_description")[0].value === ""
    )
      return "תיאור קצר מדי ";
    return "true";
  }

  //Function to compare two dates. return 1 if date a > date b , 0 if equals and -1 else.
  function compare_dates(a, b) {
    var a_converted = dates_class.convert(a);
    var b_converted = dates_class.convert(b);
    if (dates_class.compare(a_converted, b_converted) == 1) return 1;
    else if (dates_class.compare(a_converted, b_converted) == 0) return 0;
    else return -1;
  }

  //async function to create new activity.
  const createActivity = async () => {
    try {
      var IDs = pendingActivities.map((element) => parseInt(element.id));
      IDs.sort(function compareNumbers(a, b) {
        return a - b;
      });
      var zoomLink = "";
      if (props.isZoom)
        zoomLink = document.getElementsByName("activity_zoom")[0].value;
      const activity = {
        description: document.getElementById("outlined-multiline-static").value,
        id: IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1,
        owner: props.givenName + " " + props.familyName,
        title: document.getElementById("standard-basic").value,
        email: props.email,
        zoom: zoomLink,
        img: document.getElementsByName("activity_img")[0].value,
        activityCount: document.getElementsByName("activityCount")[0].value,
        dates: Array.from(document.getElementsByName("dates"))
          .map((element) => element.value)
          .sort(compare_dates),
        phone_number: props.phoneNumber,
      };
      await API.graphql(
        graphqlOperation(createPendingActivities, { input: activity })
      );
      await fetchPendingActivities();
      document.getElementById("outlined-multiline-static").value = "";
      document.getElementById("standard-basic").value = "";
      document.getElementsByName("activityCount")[0].value = "1";
      // var temp = ":תאריך פעילות מספר" + " " + 1;
      // dates = [<tr><FormElement name="dates" title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} /></tr>]
      // document.getElementById("dates_tr").innerHTML = [];
      // document.getElementById("dates_tr").append(<tr><FormElement name="dates" title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} /></tr>)
    } catch (error) {
      console.log("error creating activity: ", error);
    }
  };

  //    Hanlder Functions    //


  const handleClickOpen = () => {
    var validate = validation();
    if (validate === "true") setOpen(true);
    else {
      swal("", validate, "error", {
        button: "אישור",
      });
      setOpen(false);
    }
  };

  const handleClose = async () => {
    setOpen(false);
    await createActivity().then(
      swal("", "פרטי הקורס התקבלו, הקורס יתווסף לאחר אישור מנהל", "success", {
        button: "אישור",
      })
    );
    window.location.reload(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //The react componenet.
  return (
    <div>
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#132c33",
          minWidth: "95%",
          marginTop: "20px",
          border: "3px solid #132c33",
          borderRadius: "10px",
          maxHeight: "40px",
          paddingBottom: "15px",
        }}
        onClick={handleClickOpen}
      >
        יצירת קורס
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ backgroundColor: "#d8e3e7" }}
        >
          {" "}
          <b style={{ color: "#132c33" }}>אישור יצירת קורס</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText
            style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
          >
            בלחיצה על "אישור" פרטי הקורס ישלחו לבדיקה, במידה והפרטים תקינים הקורס יאושר
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
            ביטול
          </Button>
          <Button
            onClick={handleClose}
            style={{
              backgroundColor: "#132c33", maxHeight: "40px",
              paddingBottom: "15px", borderRadius: "10px"
            }}
            autoFocus
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
