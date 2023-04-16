import { useEffect, useState } from "react";
import styles from "./MoviesPage.module.css";
import SearchAppBar from "../../components/SearchAppBar";
import LinearBuffer from "../../components/LinearBuffer";
import { Box } from "@mui/material";
import PaginationComponent from "../../components/PaginationComponent";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moviesSlice, { getMovies } from "../../app/moviesSlice";
import Error from "../../components/Error";
import MovieItem from "./MovieItem";

function MoviesPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const error = useSelector((state) => state.movies.error);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const pagesCount = useSelector((state) => state.movies.pagesCount);
  const page = useSelector((state) => state.movies.page);
  const search = useSelector((state) => state.movies.search);
  const [searchTerm, setSearchTerm] = useState(search);
  const genre = useParams().genre;

  useEffect(() => {
    dispatch(getMovies({ page, search, genre }));
  }, [search, page, genre, dispatch]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      dispatch(
        moviesSlice.actions.updateData({
          search: searchTerm,
          page: page,
        })
      );
    }, 1000);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, page, dispatch]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (error) {
    return <Error></Error>;
  }

  return (
    <>
      <SearchAppBar
        value={searchTerm}
        genre={genre}
        onChange={handleSearchTermChange}
      ></SearchAppBar>
      <Box height="65px"></Box>
      {isLoading && <LinearBuffer></LinearBuffer>}
      {!isLoading && !error && (
        <>
          <ul className={styles.movieGrid}>
            {movies.map((movie) => (
              <Link
                key={movie.imdb_code}
                to={`/movies/${movie.imdb_code}`}
                state={movie}
              >
                <MovieItem
                  image={movie.large_cover_image}
                  title={movie.title_long}
                  rating={movie.rating}
                ></MovieItem>
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
