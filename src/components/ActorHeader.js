import React from "react";
import styles from "./DetailsHeader.module.css";
import { pathToImageUrl } from "../app/utils";
import { Stack, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ActorHeader = ({ actor }) => {
  const matches = useMediaQuery("(min-width:800px)");
  const mode = useSelector((state) => state.ui.mode);


  return (
    <Stack
      direction={matches ? "row" : "column"}
      useFlexGap
      justifyContent="center"
      alignItems="center"
    >
      <Link to={`images`}>
        <img
          src={pathToImageUrl(actor?.profile_path ?? "")}
          alt="Inner"
          className={styles.innerImage}
          style={{ paddingTop: "30px", paddingLeft: matches ? "30px" : "0px" }}
        />
      </Link>
      <div
        className={styles.description}
        style={{
          paddingLeft: matches ? "0px" : "30px",
          color: mode==="light"?"black":"white",
        }}
      >
        <p>{actor?.biography ?? ""}</p>
        <p>
          Born in {actor?.birthday ?? ""} at {actor?.place_of_birth ?? ""}
          <br></br>{" "}
          {actor.deathday ? `And Passed Away on ${actor.deathday}` : ""}
        </p>
      </div>
    </Stack>
  );
};

export default ActorHeader;
