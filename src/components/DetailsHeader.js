import React from "react";
import styles from "./DetailsHeader.module.css";
import { convertToHoursAndMinutes, pathToImageUrl } from "../app/utils";
import { Link } from "react-router-dom";

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
          <p>
            {convertToHoursAndMinutes(movieDetails?.movie?.runtime ?? 0)}
            {(movieDetails?.movie?.genres ?? [])
              .map((genre) => genre.name)
              .join(", ")}
          </p>
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
