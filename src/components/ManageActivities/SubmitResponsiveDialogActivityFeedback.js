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
  listUsers,
  listSubmitedActivityFeedbacks,
  listActivityFeedbacks,
} from "../../graphql/queries";
import {
  updateUser,
  deleteActivityFeedback,
  createSubmitedActivityFeedback,
  updateActivityFeedback,
} from "../../graphql/mutations";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import UpdateIcon from "@material-ui/icons/Update";
import swal from "sweetalert";

export default function SubmitResponsiveDialogActivityFeedback(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [activitiesFeedback, setActivitiesFeedback] = useState([]);
  const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]);
  const [allSubmittedActivitiesFeedback, setSubmittedActivitiesFeedback] =
    useState([]);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listUsers));
      const usersList = usersData.data.listUsers.items;
      console.log("USERS LIST", usersList);
      setUsers(usersList);
      console.log("USERS LIST", usersList);
    } catch (error) {
      console.log("error on fetching users", error);
    }
  };
  const updateScore = async (to_update, to_add) => {
    try {
      var list = users.filter((user) => user.id === to_update);
      const to_edit = list[0];
      console.log("SCORE BEFORE.", to_edit.score);
      to_edit.score = to_edit.score + to_add;
      console.log("SCORE BEFORE.", to_edit.score);
      delete to_edit.createdAt;
      delete to_edit.updatedAt;
      const userData = await API.graphql(
        graphqlOperation(updateUser, { input: to_edit })
      );
      const userActivityList = [...users];
      var idx = users.filter((user, idx) => {
        if (user.id === to_update) return idx;
      });
      userActivityList[idx[0]] = userData.data.updateUser;
      setUsers(userActivityList);
    } catch (error) {
      console.log("Error in updating pending activity", error);
    }
  };
  // id: ID!
  //     name: String!
  //     email: String!
  //     phone_number: String!
  //     score: Int!

  // useEffect(() => { // Fetch for content suppliers
  //     fetchActivitiesFeedbacks();
  // }, []);
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
  useEffect(() => {
    // Fetch for admins
    fetchAllActivitiesFeedbacks();
  }, []);

  useEffect(() => {
    // Fetch for admins
    fetchSubmittedActivitiesFeedbacks();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchSubmittedActivitiesFeedbacks = async () => {
    try {
      const submitteActivitiesFeedbackData = await API.graphql(
        graphqlOperation(listSubmitedActivityFeedbacks)
      );
      const submittedActivitiesFeedbackList =
        submitteActivitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
      setSubmittedActivitiesFeedback(submittedActivitiesFeedbackList);
    } catch (error) {
      console.log("error on fetching submitted activites feedback", error);
    }
  };
  const fetchActivitiesFeedbacks = async () => {
    try {
      const activitiesFeedbackData = await API.graphql(
        graphqlOperation(listActivityFeedbacks, {
          filter: { email: { eq: props.email } },
        })
      );
      const activitiesFeedbackList =
        activitiesFeedbackData.data.listActivityFeedbacks.items;
      setActivitiesFeedback(activitiesFeedbackList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };

  const fetchAllActivitiesFeedbacks = async () => {
    try {
      const activitiesFeedbackData = await API.graphql(
        graphqlOperation(listActivityFeedbacks)
      );
      const activitiesFeedbackList =
        activitiesFeedbackData.data.listActivityFeedbacks.items;
      setAllActivitiesFeedback(activitiesFeedbackList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };
  const delete_ActivityFeedback = async (id_to_delete) => {
    try {
      const del = { id: id_to_delete };
      await API.graphql(
        graphqlOperation(deleteActivityFeedback, { input: del })
      );
    } catch (error) {
      console.log("Error on delete single Approved Activity ", error);
    }
  };
  const createNewSubmittedFeedback = async () => {
    try {
      var toCreate = allActivitiesFeedback.filter(
        (feedback) => feedback.activity_id === props.id
      )[0];
      var IDs = allSubmittedActivitiesFeedback.map((element) =>
        parseInt(element.id)
      );
      IDs.sort(function compareNumbers(a, b) {
        return a - b;
      });
      var zoomLink = "";
      if (toCreate.zoom.length > 0) zoomLink = toCreate.zoom;
      const activityFeedback = {
        id: IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1,
        owner: toCreate.owner,
        title: toCreate.title,
        email: toCreate.email,
        activity_id: toCreate.activity_id,
        zoom: zoomLink,
        img: toCreate.img,
        activityCount: toCreate.activityCount,
        date: toCreate.date,
        phone_number: toCreate.phone_number,
        form: toCreate.form,
      };
      await API.graphql(
        graphqlOperation(createSubmitedActivityFeedback, {
          input: activityFeedback,
        })
      );
      await fetchSubmittedActivitiesFeedbacks();
    } catch (err) {
      console.log("Error while creating new submitted feedback.", err);
    }
  };
  const editActivityFeedback = async (id) => {
    try {
      var list = allActivitiesFeedback.filter(
        (activity) => activity.activity_id === id
      );
      const to_edit = list[0];
      var form = [];
      to_edit.form.map((student) => {
        var grade1 = student[1] + " 1";
        var grade2 = student[1] + " 2";
        var grade3 = student[1] + " 3";
        var studentWithGrade = [];
        studentWithGrade.push(student[0]);
        studentWithGrade.push(student[1]);
        studentWithGrade.push(student[2]);
        var attendance = Array.from(document.getElementsByName(grade1)).filter(
          (button) => button.checked
        )[0];
        studentWithGrade.push(attendance.value);
        var participation = Array.from(
          document.getElementsByName(grade2)
        ).filter((button) => button.checked)[0];
        studentWithGrade.push(participation.value);
        var contribution = Array.from(
          document.getElementsByName(grade3)
        ).filter((button) => button.checked)[0];
        studentWithGrade.push(contribution.value);
        form.push(studentWithGrade);
      });
      delete to_edit.createdAt;
      delete to_edit.updatedAt;
      to_edit.form = form;
      const activityFeedbackData = await API.graphql(
        graphqlOperation(updateActivityFeedback, { input: to_edit })
      );
      const activityFeedbackList = [...allActivitiesFeedback];
      var idx = allActivitiesFeedback.filter((activity, idx) => {
        if (activity.id === id) return idx;
      });
      activityFeedbackList[idx[0]] =
        activityFeedbackData.data.updateActivityFeedback;
      setAllActivitiesFeedback(activityFeedbackList);
    } catch (error) {
      console.log("Error in approved activity", error);
    }
  };

  const validateRadios = () => {
    console.log("hhh");
    var usersFromForm = users
      .filter(
        (user) =>
          Array.from(document.getElementsByName(user.email + " 1")).length > 0
      )
      .map((user) => {
        var toRetrun = [];
        toRetrun.push(
          Array.from(document.getElementsByName(user.email + " 1")).filter(
            (input) => input.checked === true
          ).length === 0
            ? false
            : true
        );
        toRetrun.push(
          Array.from(document.getElementsByName(user.email + " 2")).filter(
            (input) => input.checked === true
          ).length === 0
            ? false
            : true
        );
        toRetrun.push(
          Array.from(document.getElementsByName(user.email + " 3")).filter(
            (input) => input.checked === true
          ).length === 0
            ? false
            : true
        );
        return toRetrun;
      });
    for (var i = 0; i < usersFromForm.length; i++) {
      for (var j = 0; j < usersFromForm[i].length; j++) {
        if (usersFromForm[i][j] === false) return false;
      }
    }
    return true;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const update_S = async (to_update, score) => {
    await updateScore(to_update, score);
  };
  const handleClose = async () => {
    setOpen(false);
    var to_del = allActivitiesFeedback.filter(
      (feedback) => feedback.activity_id === props.id
    )[0].id;
    if (validateRadios() === true) {
      await editActivityFeedback(props.id)
        .then(
          allActivitiesFeedback
            .filter((feedback) => feedback.activity_id === props.id)[0]
            .form.map((elm) => {
              var toReturn = [];
              toReturn.push(
                users.filter((user) => user.email === elm[1])[0].id
              );
              toReturn.push(
                parseInt(elm[3]) + parseInt(elm[4]) + parseInt(elm[5])
              );
              return toReturn;
            })
            .forEach((user) => {
              update_S(user[0], user[1]);
              console.log("USER FROM FORM", user, props.form);
            })
        )
        .then(
          swal("", "משוב הוזן בהצלחה.", "success", {
            button: "אישור",
          })
        )
        .then(await createNewSubmittedFeedback())
        .then(await delete_ActivityFeedback(to_del));

      window.location.reload(false);
    } else {
      swal("", "אנא מלא את המשוב במלואו", "error", {
        button: "אישור",
      });
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        startIcon={
          <UpdateIcon
            style={{
              fill: "white",
              maxWidth: "100px",
              marginBottom: "11px",
            }}
          ></UpdateIcon>
        }
        variant="outlined"
        style={{
          fill: "#ffffff",
          backgroundColor: "#04c704",
          maxHeight: "40px",
          paddingBottom: "15px",
        }}
        onClick={handleClickOpen}
      >
        עדכן
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            color: "red",
            backgroundColor: "black",
          }}
        >
          <b>אישור העלאת תוכן</b>
        </DialogTitle>
        <DialogContent style={{ color: "white", backgroundColor: "black" }}>
          <DialogContentText
            style={{ color: "white", backgroundColor: "black" }}
          >
            ?האם את/ה בטוח/ה שפרטי הפעילות שהזנת תואמים את הפעילות
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ color: "white", backgroundColor: "black" }}>
          <Button
            autoFocus
            onClick={handleCancel}
            style={{
              fill: "white",
              backgroundColor: "red",
              maxHeight: "40px",
              paddingBottom: "15px",
            }}
          >
            בטל&nbsp;העלאה
          </Button>
          <Button
            onClick={handleClose}
            style={{
              fill: "white",
              backgroundColor: "green",
              maxHeight: "40px",
              paddingBottom: "15px",
            }}
            autoFocus
          >
            אשר&nbsp;העלאה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
