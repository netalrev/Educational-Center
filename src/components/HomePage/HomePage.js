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
        <h3 className="desc">
          נט-סקילס רחובות- הדרך החדשה שלכם לצרוך תוכן איכותי! חשבתם פעם על
          לימודי שחמט? מרגישים שאתם חייבים לדעת לתכנת? חלמתם פעם על לימודי
          גיטרה? בא לכם לעשות יוגה? ומה עם להקים סטארטאפ? הגעתם למקום הנכון!
          נט-סקילס מגיש לכם את התוכן שאתם הכי רוצים ללמוד ישר אל כף היד! איפה?-
          בזום, מתי? מתי שנוח לכם, כמה?- בחינם! אז איך זה עובד? חמישה מפגשים
          קצרים עם מומחי תוכן שמגיעים בהתנדבות להעביר לכם את הסדנה הכי מקצועית
          יש! אנחנו מזמינים אותכם לקחת חלק בסדנאות ייחודיות במגוון רחב של עולמות
          תוכן- להכיר, ללמוד, לשאול, לגלות ובעיקר פשוט ליהנות. נתראה!
        </h3>
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
