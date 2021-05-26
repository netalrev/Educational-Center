import React from "react";

import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";

export default function OpenZoomLink(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    window.open(props.zoom, "_blank").focus();
  };

  return (
    <div>
      <Button
        startIcon={
          <OndemandVideoIcon style={{
            fill: "white",
            maxWidth: "100px",
            marginBottom: "11px"
          }}></OndemandVideoIcon>
        }
        variant="outlined"
        style={{
          background: "red", color: "white", borderRadius: "33px", maxHeight: "40px",
          paddingBottom: "15px"
        }}
        onClick={handleClickOpen}
      >
        כניסה&nbsp;לפעילות
      </Button>
    </div>
  );
}
