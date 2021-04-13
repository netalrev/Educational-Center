import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>אודות הפרוייקט</Heading>
            <FooterLink href="#">מטרה</FooterLink>
            <FooterLink href="#">חזון</FooterLink>
            <FooterLink href="#">יונה אפס</FooterLink>
          </Column>
          <Column>
            <Heading>שירותים</Heading>
            <FooterLink href="#">כתיבה</FooterLink>
            <FooterLink href="#">התמחויות</FooterLink>
            <FooterLink href="#">קוד</FooterLink>
            <FooterLink href="#">הוראה</FooterLink>
          </Column>
          <Column>
            <Heading>צור קשר</Heading>
            <FooterLink href="#">משהו</FooterLink>
            <FooterLink href="#">כזה</FooterLink>
            <FooterLink href="#">בערך</FooterLink>
            <FooterLink href="#">לפה</FooterLink>
          </Column>
          <Column>
            <Heading>הצטרפו אלינו!</Heading>
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
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
