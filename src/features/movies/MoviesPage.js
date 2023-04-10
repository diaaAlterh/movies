import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import styles from "./MoviesPage.module.css";
import SearchAppBar from "../../components/SearchAppBar";
import LinearBuffer from "../../components/LinearBuffer";
import { Box } from "@mui/material";
import PaginationComponent from "../../components/PaginationComponent";
import RatingStar from "../../components/RatingStar";

function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data, isLoading, error } = useFetch(
    `https://yts.mx/api/v2/list_movies.json?query_term=${debouncedSearchTerm}&limit=50&sort_by=download_count&page=${page}`
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMovieHover = (event) => {
    event.currentTarget
      .querySelector(".posterImage")
      .classList.toggle(styles.hovered);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const movies = data?.data?.movies ?? [];

  return (
    <>
      <SearchAppBar
        value={searchTerm}
        onChange={handleSearchTermChange}
      ></SearchAppBar>
      <Box height="65px"></Box>
      {isLoading && <LinearBuffer></LinearBuffer>}
      {!isLoading && !error && (
        <>
          <ul className={styles.movieGrid}>
            {movies.map((movie) => (
              <li
                key={movie.imdb_code}
                className={styles.movieItem}
                onMouseEnter={handleMovieHover}
                onMouseLeave={handleMovieHover}
              >
                <img
                  className={`${styles.posterImage} posterImage`}
                  src={movie.large_cover_image}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = movie.background_image;
                    e.target.onerror = null;
                  }}
                />

                <div className={styles.movieTitle}>
                  {movie.title}
                  {"\n"}({movie.year})
                </div>
                <RatingStar rating={movie.rating}></RatingStar>
              </li>
            ))}
          </ul>
          <PaginationComponent
            onChange={(e, value) => {
              setPage(value);
            }}
            page={page}
            count={((data?.data?.movie_count ?? 50) / 50).toFixed()}
          ></PaginationComponent>
        </>
      )}
    </>
  );
}
export default MoviesPage;
