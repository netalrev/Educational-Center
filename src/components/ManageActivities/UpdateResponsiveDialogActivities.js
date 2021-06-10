import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  updateApprovedActivities,
  updatePendingActivities,
} from "../../graphql/mutations";
import {
  listPendingActivitiess,
  listApprovedActivitiess,
} from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import SaveIcon from '@material-ui/icons/Save';
import swal from "sweetalert";

export default function UpdateResponsiveDialog(props) {

  //               Use State Initialization              //

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [allPendingActivitiess, setPendingActivitiess] = useState([]);
  const [allApprovedActivitiess, setApprovedActivitiess] = useState([]);

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

  //               Use Effect Initialization              //

  useEffect(() => {
    fetchPendingActivities();
  }, []);

  useEffect(() => {
    // Fetch for content suppliers
    fetchAllApprovedActivities();
  }, []);


  //               More Functions..              //


  //Function to compare two dates.return 1 if date a > date b,0 if equals and -1 else.
  function compare_dates(a, b) {
    var a_converted = dates_class.convert(a);
    var b_converted = dates_class.convert(b);
    if (dates_class.compare(a_converted, b_converted) == 1) return 1;
    else if (dates_class.compare(a_converted, b_converted) == 0) return 0;
    else return -1;
  }
  const fetchAllApprovedActivities = async () => {
    try {
      const ApprovedActivitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const ApprovedActivitiesList =
        ApprovedActivitiesData.data.listApprovedActivitiess.items;
      setApprovedActivitiess(ApprovedActivitiesList);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  //async function to fetch pending activitis.
  const fetchPendingActivities = async () => {
    try {
      const activitiesData = await API.graphql(
        graphqlOperation(listPendingActivitiess)
      );
      const activitiesList = activitiesData.data.listPendingActivitiess.items;
      setPendingActivitiess(activitiesList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };

  //async function to fetch edit pending activitis.
  const editPendingActivities = async (id) => {
    try {
      var list = allPendingActivitiess.filter((activity) => activity.id === id);
      const to_edit = list[0];
      to_edit.title = document.getElementById("standard-basic").value;
      to_edit.img = document.getElementsByName("activity_img")[0].value;
      if (props.isZoom) {
        if (document.getElementsByName("activity_zoom")[0].value != "") {
          to_edit.zoom = document.getElementsByName("activity_zoom")[0].value;
        }
      }
      to_edit.activityCount =
        document.getElementsByName("activityCount")[0].value;
      to_edit.dates = Array.from(document.getElementsByName("dates"))
        .map((element) => element.value)
        .sort(compare_dates);
      to_edit.description = document.getElementById(
        "outlined-multiline-static"
      ).value;
      delete to_edit.createdAt;
      delete to_edit.updatedAt;
      console.log("hey", to_edit);
      const activityData = await API.graphql(
        graphqlOperation(updatePendingActivities, { input: to_edit })
      );
      const pendingActivityList = [...allPendingActivitiess];
      var idx = allPendingActivitiess.filter((activity, idx) => {
        if (activity.id === id) return idx;
      });
      pendingActivityList[idx[0]] = activityData.data.updatePendingActivities;
      setPendingActivitiess(pendingActivityList);
    } catch (error) {
      console.log("Error in updating pending activity", error);
    }
  };

  //async function to edit approved activity by id.
  const editApprovedActivities = async (id) => {
    try {
      var list = allApprovedActivitiess.filter(
        (activity) => activity.id === id
      );
      const to_edit = list[0];
      if (props.groupName === "admins") {
        to_edit.title = document.getElementById("standard-basic").value;
        to_edit.img = document.getElementsByName("activity_img")[0].value;
        to_edit.description = document.getElementById(
          "outlined-multiline-static"
        ).value;
      }
      if (props.isZoom) {
        if (document.getElementsByName("activity_zoom")[0].value != "") {
          to_edit.zoom = document.getElementsByName("activity_zoom")[0].value;
        }
      } else if (!props.isZoom) {
        to_edit.zoom = "";
      }
      to_edit.activityCount =
        document.getElementsByName("activityCount")[0].value;
      to_edit.dates = Array.from(document.getElementsByName("dates"))
        .map((element) => element.value)
        .sort(compare_dates);
      delete to_edit.createdAt;
      delete to_edit.updatedAt;
      console.log(to_edit);
      const activityData = await API.graphql(
        graphqlOperation(updateApprovedActivities, { input: to_edit })
      );
      const approvedActivityList = [...allApprovedActivitiess];
      var idx = allApprovedActivitiess.filter((activity, idx) => {
        if (activity.id === id) return idx;
      });
      approvedActivityList[idx[0]] = activityData.data.updateApprovedActivities;
      setApprovedActivitiess(approvedActivityList);
    } catch (error) {
      console.log("Error in approved activity", error);
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
    if (props.type === "approved" && props.groupName === "contentSuppliers") {
      if (document.getElementById("zoomCheckBox").checked) {
        if (document.getElementsByName("activity_zoom")[0].value !== "") {
          if (!validURL(document.getElementsByName("activity_zoom")[0].value))
            return "קישור לזום אינו תקין";
        }
      } if (
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
        if (dates_class.compare(current_time, temp) == 1)
          return "יש להכניס מועד עתידי";
      }
      return "true";
    } else {
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
      } else if (
        !document.getElementsByName("activityCount")[0].value ||
        document.getElementsByName("activityCount")[0].value < 1 ||
        document.getElementsByName("activityCount")[0].value === ""
      )
        return "יש להכניס לפחות מפגש אחד";
      if (props.groupName === "contentSuppliers") {
        var date_map = Array.from(document.getElementsByName("dates")).map(
          (date) => date.value
        );
        var current_time = props.currentTime;
        var temp;
        for (var i = 0; i < date_map.length; i++) {
          temp = dates_class.convert(date_map[i]);
          if (dates_class.compare(current_time, temp) == 1)
            return "יש להכניס מועד עתידי";
        }
      }
      if (
        document.getElementsByName("activity_description")[0].value.length <
        10 ||
        document.getElementsByName("activity_description")[0].value === ""
      )
        return "תיאור קצר מדי";
      return "true";
    }
  }

  //    Hanlder Function    //

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlea = () => {
    console.log("aaa");
  };

  const handleClose = async () => {
    setOpen(false);
    const validate = validation();
    if (validate == "true") {
      if (props.type === "pending") {
        await editPendingActivities(props.id).then(
          swal("", "בקשתך לעריכת התוכן המבוקש התקבלה בהצלחה.", "success", {
            button: "אישור",
          })
        );
        window.location.reload(false);
      } else {
        await editApprovedActivities(props.id).then(
          swal("", "בקשתך לעריכת התוכן המבוקש התקבלה בהצלחה.", "success", {
            button: "אישור",
            handlea,
          })
        );
        window.location.reload(false);
      }
    } else {
      swal("", validate, "error", {
        button: "אישור",
      });
      setOpen(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //React component .
  return (
    <div>
      <Button
        startIcon={
          <SaveIcon
            style={{
              fill: "white",
              maxWidth: "100px",
              marginBottom: "11px",
            }}
          ></SaveIcon>
        }
        variant="outlined"
        style={{
          fill: "#d8e3e7",
          backgroundColor: "#132c33",
          maxHeight: "40px",
          paddingBottom: "15px",
          border: "3px solid #132c33",
        }}
        onClick={handleClickOpen}
      >
        שמירת שינויים
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
          <b style={{ color: "#132c33" }}>אישור שמירת שינויים</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          {props.type === "pending" ?
            <DialogContentText
              style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
            >
              בלחיצה על "אישור" השינויים ישמרו במאגר מידע
          </DialogContentText>
            :
            <DialogContentText
              style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
            >
              בלחיצה על "אישור" השינויים ישמרו ויוצגו בדף קורסים
        </DialogContentText>
          }
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
