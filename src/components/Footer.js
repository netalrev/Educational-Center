import { Box, Container, Heading } from "./FooterStyles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

//The copyright HTML code as function.
function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      style={{
        color: "white",
        padding: "20px",
      }}
    >
      {"Copyright © "}
      <Link
        style={{
          color: "white",
        }}
        href="#"
      >
        המרחב החינוכי השלם
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

//The Footer component with HTML code for footer.
const Footer = () => {
  return (
    <Box>
      <Container>
        <div
          style={{
            justifyItems: "center",
            alignContent: "center",
            color: "white",
          }}
        >
          <Heading>תנאי שימוש</Heading>
          <img
            style={{ width: "70px", height: "70px", marginBottom: "20px" }}
            src={"/img/agreement.png"}
          />

          <p style={{ color: "white", fontSize: "15px" }}>
            צוות נטסקילס מגייס מומחי תוכן בהתנדבות שעובדים קשה על מנת להעביר
            סדנאות מקצועיות ומעניינות. כל תלמיד המשתתף באחת מן הסדנאות, מגיע
            מרצונו החופשי ומסכים לתנאי ההשתתפות:
            <br></br>
            <br></br>
            <ol style={{ textAlign: "right", listStyleType: "none" }}>
              <li
                style={{
                  paddingRight: ".6em",
                }}
              >
                חלה חובה לפתוח מצלמה במהלך כל המפגש. הסדנה בנויה על היכרות
                מוקדמת בין התלמידים בדיוק בשביל שירגישו בנוח להראות את עצמם
              </li>
              <li
                style={{
                  paddingRight: ".6em",
                }}
              >
                --{" "}
              </li>
              <li
                style={{
                  paddingRight: ".6em",
                }}
              >
                מגיעים בזמן למפגש ובכל מקרה של קושי בהגעה/ יש להודיע למדריך
                *מספיק זמן מראש*
              </li>
              <li
                style={{
                  paddingRight: ".6em",
                }}
              >
                --{" "}
              </li>
              <li
                style={{
                  paddingRight: ".6em",
                }}
              >
                במהלך המפגשים שומרים על תרבות דיון המכבדת הן את המדריך והן אחד
                את השני
              </li>
            </ol>
          </p>
        </div>
      </Container>
      {/* Copyright for icons */}
      <Copyright />
      <img
        style={{ width: "120px", height: "120px" }}
        src="logo.png"
        alt="Logo"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/"; //Url to icon button.
        }}
      />

      <div style={{ color: "white", fontSize: "13px", margin: "20px" }}>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
        Powered by <a href="https://www.amdoren.com">Amdoren</a>
      </div>
    </Box>
  );
};
export default Footer;
