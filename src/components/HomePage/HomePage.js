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
    <div className="main_div">
      <div className="background-tint">
        <h1 className="homeTitle1">ברוכים הבאים אל 5 על 5</h1>
        <h2 className="homeTitle2">
          The purpose of the association is to make every youth in Israel
          accessible to a variety of educational solutions, to reduce social
          disparities and provide equal opportunities for everyone, while
          creating a coalition of educators, building a community, and making
          partnerships with government ministries, authorities, business and
          third sector. The association will provide educational and moral
          values tools, that will enable the youth to excel, integrate into
          society as a contributing citizen and a leader, characterize and
          implement a technological platform integrated with artificial
          intelligence that will enable fast, smart and effective connection
          between non-formal education, government ministries, authorities,
          schools, communities and the youth, developing relevant educational
          solutions and connecting them to educational institutions abroad in
          order to promote Israel as an educational nation.{" "}
        </h2>
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
