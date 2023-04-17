import { Typography, useMediaQuery } from "@mui/material";

const SideTitle = (props) => {
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <Typography
      variant={matches?"h4":"s1"}
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
