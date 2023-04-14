import { Typography } from "@mui/material";

const SideTitle = (props) => {
  return (
    <Typography
      variant="h4"
      noWrap
      component="div"
      sx={{
        flexGrow: 1,
        display: { xs: "block", sm: "block" },
        color: "white",
        padding: "20px",
      }}
    >
      {props.children}
    </Typography>
  );
};
export default SideTitle;
