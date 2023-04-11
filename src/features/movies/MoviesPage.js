import { useEffect, useState } from "react";
import styles from "./MoviesPage.module.css";
import SearchAppBar from "../../components/SearchAppBar";
import LinearBuffer from "../../components/LinearBuffer";
import { Box } from "@mui/material";
import PaginationComponent from "../../components/PaginationComponent";
import RatingStar from "../../components/RatingStar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moviesSlice, { getMovies } from "../../app/moviesSlice";

function MoviesPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const error = useSelector((state) => state.movies.error);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const pagesCount = useSelector((state) => state.movies.pagesCount);
  const page = useSelector((state) => state.movies.page);
  const search = useSelector((state) => state.movies.search);
  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    dispatch(getMovies({ page, search }));
  }, [search, page, dispatch]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      dispatch(
        moviesSlice.actions.updateData({
          search: searchTerm,
          page: searchTerm ? page : 1,
        })
      );
    }, 1000);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, page, dispatch]);

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
              <Link key={movie.imdb_code} to={`movies/${movie.imdb_code}`}>
                <li
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
              </Link>
            ))}
          </ul>
          <PaginationComponent
            onChange={(e, value) => {
              dispatch(
                moviesSlice.actions.updateData({
                  search,
                  page: value,
                })
              );
            }}
            page={page}
            count={pagesCount}
          ></PaginationComponent>
        </>
      )}
    </>
  );
}
export default MoviesPage;
