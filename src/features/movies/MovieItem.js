import { useState } from "react";
import RatingStar from "../../components/RatingStar";
import styles from "./MoviesPage.module.css";
import { moviePlaceHolder } from "../../app/utils";

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
    <li
      onClick={props.onClick}
      key={props.id}
      className={styles.movieItem}
      onMouseEnter={handleMovieHover}
      onMouseLeave={handleMovieHover}
    >
      <img
        className={`${styles.posterImage} posterImage`}
        src={isLoading ? moviePlaceHolder : props.image}
        alt={props.title}
        onLoad={handleImageLoad}
        onError={(e) => {
          e.target.src = moviePlaceHolder;
          e.target.onerror = null;
        }}
      />

      <div className={styles.movieTitle}>{props.title}</div>
      {props.rating && <RatingStar rating={props.rating}></RatingStar>}
    </li>
  );
};
export default MovieItem;
