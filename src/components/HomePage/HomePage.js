import "./HomePage.css"; // All style (include main image) for home page.
import { useHistory } from "react-router-dom";

//For set next pages.
var history;

//Function to set next page to activities page from home page.
function goToAc() {
  history.push("./activitiesPage");
}

//Function to set next page to register page from home page.
function goToProfile() {
  history.push("./register");
}

//HTML code with scripts in tags.
export default function HomePage() {
  history = useHistory();
  return (
    <div className="main_div" style={{ backgroundImage: "/img/wallpaper.png" }}>
      <img className="wallpaper1" src={"/img/wallpaper.png"} />
      <div className="buttons">
        <button className="big-button" onClick={goToAc}>
          לכל הקורסים
        </button>
        <button className="big-button" onClick={goToProfile}>
          לאזור האישי
        </button>
      </div>
    </div>
  );
}
