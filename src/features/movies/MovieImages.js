import styles from "./MoviesPage.module.css";
import { json, useLoaderData } from "react-router-dom";
import { apiKey, pathToImageUrl, tmdbBaseUrl } from "../../app/utils";

const MovieImages = () => {
  const data = useLoaderData();
  const images = [
    ...(data?.backdrops ?? []),
    ...(data?.posters ?? []),
    ...(data?.profiles ?? []),
  ];

  const handleMovieHover = (event) => {
    event.currentTarget
      .querySelector(".posterImage")
      .classList.toggle(styles.hovered);
  };

  return (
    <ul className={styles.movieGrid}>
      {images.map((image) => (
        <li
          key={image.file_path}
          className={styles.movieItem}
          onMouseEnter={handleMovieHover}
          onMouseLeave={handleMovieHover}
        >
          <img
            className={`${styles.posterImage} posterImage`}
            src={pathToImageUrl(image.file_path)}
            alt={image.name}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieImages;

export const loader = async (props) => {
  const isForActor = props.request.url.includes("actor");
  try {
    const imagesResponse = await fetch(
      `${tmdbBaseUrl}${isForActor ? "person" : "movie"}/${
        props.params.id
      }/images?api_key=${apiKey}&language=en-US&include_image_language=en,null`
    );

    if (!imagesResponse.ok) {
      throw new Error("Something went wrong");
    }

    return imagesResponse;
  } catch (e) {
    throw json({ message: "Something went Worng", status: 400 });
  }
};
