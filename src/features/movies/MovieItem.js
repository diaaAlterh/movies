import { useState } from "react";
import RatingStar from "../../components/RatingStar";
import styles from "./MoviesPage.module.css";
import { moviePlaceHolder } from "../../app/utils";
import { Button } from "@mui/material";

const MovieItem = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const handleMovieHover = (event) => {
    event.currentTarget
      .querySelector(".posterImage")
      .classList.toggle(styles.hovered);
  };
  return (
    <Button
      key={props.id}
      sx={{
        ":hover": {
          bgcolor: "primary", // theme.palette.primary.main
          color: "white",
        },
      }}
      variant="text"
      onClick={props.onClick}
      style={{ padding: 0 }}
    >
      <li
        className={styles.movieItem}
        onMouseEnter={handleMovieHover}
        onMouseLeave={handleMovieHover}
      >
        <img
          className={`${styles.posterImage} posterImage`}
          src={props.image}
          alt={props.title}
          onLoad={handleImageLoad}
          onError={(e) => {
            e.target.src = moviePlaceHolder;
            e.target.onerror = null;
          }}
        />
        {!isLoading && (
          <>
            <div className={styles.movieTitle}>{props.title}</div>
            {props.rating && <RatingStar rating={props.rating}></RatingStar>}
          </>
        )}
      </li>
    </Button>
  );
};
export default MovieItem;
