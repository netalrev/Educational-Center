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
        <Row>
          <Column>
            <Heading>הצטרפו אלינו</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <Heading>צור קשר</Heading>
            <FooterLink href="#">משהו</FooterLink>
            <FooterLink href="#">כזה</FooterLink>
            <FooterLink href="#">בערך</FooterLink>
            <FooterLink href="#">לפה</FooterLink>
          </Column>
          <Column>
            <Heading>שירותים</Heading>
            <FooterLink href="#">כתיבה</FooterLink>
            <FooterLink href="#">התמחויות</FooterLink>
            <FooterLink href="#">קוד</FooterLink>
            <FooterLink href="#">הוראה</FooterLink>
          </Column>
          <Column>
            <div style={{ justifyItems: 'center', alignContent: 'center', color: 'white', minWidth: '400px' }}>
              <Heading>מטרת הפרוייקט</Heading>
              <p style={{ color: 'white', minWidth: '400px' }}>להנגיש לכל נערי מדינת
              ישראל מגוון תכנים חינוכיים, בדגש למיומנויות המאה ה-21, על מנת לצמצם פערים חברתיים
              ומתן שיווין הזדמנויות לכל אחד ואחת, תוך יצירת קואליציית מחנכים, בניית קהילות,
              שותפות עם משרדי ממשלה, רשויות, מגזר עסקי ומגזר שלישי,
              מתן כלים חינוכיים וערכיים שיאפשרו לנער/ה להצטיין,
               להשתלב בחברה כאזרח תורם וכמנהיג</p>
            </div>
          </Column>
        </Row>
      </Container>
      <Copyright />
    </Box>
  );
};
export default Footer;
