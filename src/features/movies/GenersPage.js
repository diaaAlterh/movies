import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MovieItem from "./MovieItem";
import { Link, json, useLoaderData } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import { tmdbBaseUrl, apiKey, moviePlaceHolder } from "../../app/utils";
import { useTheme } from "@emotion/react";

const GenersPage = () => {
  const data = useLoaderData();
  const genres = data.genres.filter((genre) => genre.name !== "TV Movie");
  const theme=useTheme();


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ backgroundColor: theme.palette.primary.main }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
            >
              Movies Genres
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box height="65px"></Box>
      <ul className={styles.movieGrid}>
        {genres.map((genre) => (
          <Link
            to={genre.name !== "Science Fiction" ? `${genre.name}` : "Sci-fi"}
            key={genre.name}
          >
            <MovieItem image={moviePlaceHolder} title={genre.name}></MovieItem>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default GenersPage;

export const loader = async () => {
  try {
    const response = await fetch(
      `${tmdbBaseUrl}genre/movie/list?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response;
  } catch (e) {
    throw json({ message: "Something went Worng", status: 400 });
  }
};
