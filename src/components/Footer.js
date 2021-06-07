import React from "react";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

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
          <Heading>מטרת הפרוייקט</Heading>
          <p style={{ color: "white" }}>
            להנגיש לכל נערי מדינת ישראל מגוון תכנים חינוכיים, בדגש למיומנויות
            המאה ה-21, על מנת לצמצם פערים חברתיים ומתן שיווין הזדמנויות לכל אחד
            ואחת, תוך יצירת קואליציית מחנכים, בניית קהילות, שותפות עם משרדי
            ממשלה, רשויות, מגזר עסקי ומגזר שלישי, מתן כלים חינוכיים וערכיים
            שיאפשרו לנער/ה להצטיין, להשתלב בחברה כאזרח תורם וכמנהיג
          </p>
        </div>
      </Container>
      <div style={{ color: "white", fontSize: "13px", margin: "20px" }}>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <Copyright />
    </Box>
  );
};
export default Footer;
