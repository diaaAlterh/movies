import React from "react";
import styles from "./DetailsHeader.module.css";
import { convertToHoursAndMinutes, pathToImageUrl } from "../app/utils";
import { Link } from "react-router-dom";
import { Button, Stack, useMediaQuery } from "@mui/material";

const DetailsHeader = ({ movieDetails }) => {
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <img
          src={pathToImageUrl(movieDetails?.movie?.backdrop_path ?? "")}
          alt="Header"
          className={styles.headerImage}
        />
        <div className={styles.backdrop}></div>
      </div>

      <div className={styles.inner}>
        <Link to={`/movies/${movieDetails.movie.id}/images`}>
          <img
            src={pathToImageUrl(movieDetails?.movie?.poster_path ?? "")}
            alt="Inner"
            className={styles.innerImage}
          />
        </Link>
        <div className={styles.description}>
          <h3>{movieDetails?.movie?.tagline ?? ""}</h3>
          <p>{convertToHoursAndMinutes(movieDetails?.movie?.runtime ?? 0)}</p>
          <Stack direction={matches?"row":"column"} flexWrap="wrap" spacing={{ xs: 1, sm: 4, }}>
            {(movieDetails?.movie?.genres ?? []).map((genre) => {
              let genreName;
              if (genre.name === "Science Fiction") {
                genreName = "Sci-Fi";
              } else {
                genreName = genre.name;
              }
              return (
                <Link to={`/movies/genres/${genreName}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "0" }}
                  >
                    {genre.name}
                  </Button>
                </Link>
              );
            })}
          </Stack>

          <p>{movieDetails?.movie?.overview ?? ""}</p>
          <p>
            {(movieDetails?.movie?.spoken_languages ?? [])
              .map((language) => language.english_name)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
