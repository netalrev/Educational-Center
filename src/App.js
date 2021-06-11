import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import Loading from "./components/Loading/Loading";
import ProfileCard from "./components/Profile/ProfileCard";
import SignUp from "./components/Register/SignUp";
import { useState, useEffect } from "react";
import { createUser } from "./graphql/mutations";
import { listUsers } from "./graphql/queries";
import SignIn from "./components/SignIn/SignIn";
import ForgetPassword from "./components/SignIn/ForgetPassword";
import ManagePanel from "./components/ManagePanel/ManagePanel";
import ManageActivities from "./components/ManageActivities/ManageActivities";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActivitiesPage from "./components/Activities/ActivitiesPage";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import ConfirmSignUp from "./components/Register/ConfirmSignUp";
import { Hub, Logger } from "aws-amplify";
import swal from "sweetalert";

Amplify.configure(awsconfig); //AWS CONFIGORE

//Vlaues of current authenticated user.
var fname = "null";
var gname = "null";
var emailAddress = "null";
var groupName = "null";
var phoneNumber = "null";
var groups = new Array(3);//For check user group.

//Get vlaues from current authenticated user.
Auth.currentAuthenticatedUser().then(
  (user) =>
    (gname = user.attributes.given_name) &&
    (fname = user.attributes.family_name) &&
    (emailAddress = user.attributes.email) &&
    (phoneNumber = user.attributes.phone_number) &&
    (groups = user.signInUserSession.accessToken.payload["cognito:groups"]) &&
    (groupName = groups[0])
);

//Info messege for several events.
const logger = new Logger("Logger", "INFO");
const listener = (data) => {
  switch (data.payload.event) {
    case "signIn":
      logger.info("user signed in");
      break;
    case "signUp":
      logger.info("user signed up");
      break;
    case "signOut":
      logger.info("user signed out");
      break;
    case "signIn_failure":
      logger.info("user sign in failed");
      break;
    case "configured":
      logger.info("the Auth module is configured");
      break;
    default:
      logger.error("Something went wrong, look at data object", data);
  }
};
//Connect listener for authentication.
Hub.listen("auth", listener);

function App() {

  //                 Use State Initialization                //

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);


  //                 Functions                //

  ////async function that return all user list stored in DB.
  const fetchUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listUsers));
      const usersList = usersData.data.listUsers.items;
      setUsers(usersList);
    } catch (error) {
      console.log("error on fetching users", error);
    }
  };

  //async function that crate new user and enter it to DB.
  const create_User = async () => {
    try {
      var IDs = users.map((element) => parseInt(element.id));
      IDs.sort(function compareNumbers(a, b) {
        return a - b;
      });
      const user = {
        name: gname + " " + fname,
        id: IDs.length === 0 ? 0 : IDs[IDs.length - 1] + 1,
        email: emailAddress,
        phone_number: phoneNumber,
        score: 0,
      };
      await API.graphql(graphqlOperation(createUser, { input: user }));
      await fetchUsers();
    } catch (error) {
      console.log("error creating user: ", error);
    }
  };
  //Helper function for async function createUser.
  const createU = async () => {
    await create_User();
  };

  ////async function thath check if this user is authenticated.
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        swal(" ", e, "error", {
          button: "אישור",
        });
      }
    }
    setIsAuthenticating(false);
  }


  //                 Use Effects                //
  useEffect(() => {
    fetchUsers();
  }, []);


  useEffect(() => {
    onLoad();
  }, []);


  //                 Flow                //

  if (isAuthenticating) void 0;

  //Check if this authenticated user is not in the user list. if true - enter his to list, else-ignore.
  if (
    users.filter((user) => user.email === emailAddress).length === 0 &&
    groupName === "approvedUsers"
  ) {
    createU();
  }

  //React componenet with cases for spesific group.
  return (
    <div className="App">
      <Navbar givenName={gname} familyName={fname} groupName={groupName} />
      <div className="main" id="mainDiv">
        <Router>
          <Switch>
            <Route exact path="/loading">
              <Loading />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            {groupName === "admins" ||
              groupName === "contentSuppliers" ||
              groupName === "approvedUsers" ? (
              <Route exact path="/profile">
                <h1>עמוד פרופיל</h1>
              </Route>
            ) : (
              <Route exact path="/profile">
                <h2 className="forbidden">אנא התחבר\י על מנת לצפות בפרופיל</h2>
              </Route>
            )}
            {groupName === "admins" ||
              groupName === "contentSuppliers" ||
              groupName === "approvedUsers" ? (
              <Route exact path="/activitiespage">
                <ActivitiesPage
                  groupName={groupName}
                  email={emailAddress}
                  givenName={gname}
                  familyName={fname}
                  phoneNumber={phoneNumber}
                />
              </Route>
            ) : (
              <Route exact path="/activitiespage">
                <h2 className="forbidden" style={{ color: "#132c33" }}>
                  אנא התחבר\י על מנת לצפות בפעילויות
                </h2>
              </Route>
            )}

            {groupName === "admins" || groupName === "contentSuppliers" ? (
              <Route exact path="/manageActivities">
                <ManageActivities
                  phoneNumber={phoneNumber}
                  groupName={groupName}
                  givenName={gname}
                  familyName={fname}
                  email={emailAddress}
                />
              </Route>
            ) : (
              <Route exact path="/manageActivities">
                <h2 className="forbidden">Access Forbbiden</h2>
              </Route>
            )}
            {groupName === "admins" ? (
              <Route exact path="/ManagerPanel">
                <ManagePanel
                  phoneNumber={phoneNumber}
                  groupName={groupName}
                  givenName={gname}
                  familyName={fname}
                  email={emailAddress}
                />
              </Route>
            ) : (
              <Route exact path="/ManagerPanel">
                <h2 className="forbidden">Access Forbbiden</h2>
              </Route>
            )}
            <Route exact path="/register">
              {isAuthenticated ? (
                <div>
                  {" "}
                  <ProfileCard
                    givenName={gname}
                    familyName={fname}
                    groupName={groupName}
                    email={emailAddress}
                  />{" "}
                </div>
              ) : (
                <SignIn />
              )}
            </Route>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>
            <Route exact path="/ConfirmSignUp">
              <ConfirmSignUp />
            </Route>
            <Route exact path="/ForgetPassword">
              <ForgetPassword />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}
export default App;
