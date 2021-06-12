import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";

export default function OpenZoomLink(props) {


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //Handler function for zoom link.
  const handleClickOpen = () => {
    window.open(props.zoom, "_blank").focus();
  };

  //React componenet for zoom link.
  return (
    <div>
      <Button
        startIcon={
          <OndemandVideoIcon
            style={{
              fill: "#d8e3e7",
              maxWidth: "100px",
              marginBottom: "11px",
            }}
          ></OndemandVideoIcon>
        }
        variant="outlined"
        style={{
          background: "#132c33",
          color: "#d8e3e7",
          border: "3px solid #d8e3e7",
          maxHeight: "40px",
          paddingBottom: "15px",
        }}
        onClick={handleClickOpen}
        id="startZoom"
      >
        כניסה&nbsp;לפעילות
      </Button>
    </div>
  );
}
