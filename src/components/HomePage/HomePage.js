import "./HomePage.css";
import React from "react";
import Button from "@material-ui/core/Button";

export default function HomePage() {
  return (
    <div className="contHome">
      <div className="ternary-system">
        <div className="sun primary"></div>
        <div className="sun secondary"></div>
        <div className="sun ternary"></div>
      </div>
      <div className="text1">
        <h1 className="title1">
          <strong>פרוייקט 5 על 5</strong>
        </h1>
        <Button
          style={{
            marginTop: "80px",
            color: "white",
          }}
          className="glow-on-hover"
          href="/activitiesPage"
        >
          לחץ כאן לכל הפעילויות
        </Button>
      </div>
    </div>
  );
}
