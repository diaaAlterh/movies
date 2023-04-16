import React from "react";
import styles from "./DetailsHeader.module.css";
import { convertToHoursAndMinutes, pathToImageUrl } from "../app/utils";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const DetailsHeader = ({ movieDetails }) => {
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
                  style={{ marginRight: "20px", marginLeft: "0" }}
                >
                  {genre.name}
                </Button>
              </Link>
            );
          })}

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
