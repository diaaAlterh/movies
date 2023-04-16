import { json, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Error from "../../components/Error";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import RatingStar from "../../components/RatingStar";
import ActorHeader from "../../components/ActorHeader";
import { tmdbBaseUrl, apiKey, pathToImageUrl } from "../../app/utils";
import useFetch from "../../hooks/useFetch";
import LinearBuffer from "../../components/LinearBuffer";
import SideTitle from "../../components/SideTitle";
import MovieItem from "./MovieItem";
import styles from "./MoviesPage.module.css";

const ActorDetails = () => {
  const actor = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch(
    `${tmdbBaseUrl}person/${params.id}/movie_credits?api_key=${apiKey}`
  );
  const movies = (data?.cast ?? []).filter((movie) => {
    return movie.backdrop_path !== null&&movie.vote_count>1200;
  }).sort((a,b)=>b.vote_count-a.vote_count);

  const handleClick = async (id) => {
    try {
      const idResponse = await fetch(
        `${tmdbBaseUrl}movie/${id}/external_ids?api_key=${apiKey}`
      );

      if (!idResponse.ok) {
        throw new Error("Something went wrong");
      }
      const idData = await idResponse.json();
      navigate(`/movies/${idData.imdb_id}`);
    } catch (error) {}
  };

  if (actor && !error) {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" style={{ backgroundColor: "#13161d" }}>
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
              >
                {actor.name ?? ""}
              </Typography>
              <RatingStar id={actor.imdb_id}></RatingStar>
            </Toolbar>
          </AppBar>
        </Box>
        <Box height="65px"></Box>
        {isLoading && <LinearBuffer></LinearBuffer>}
        <ActorHeader actor={actor}></ActorHeader>

        <>
          <SideTitle>{actor.name} Movies:</SideTitle>
          <ul className={styles.movieGrid}>
            {movies.map((movie) => (
              <MovieItem
                onClick={() => {
                  handleClick(movie.id);
                }}
                key={movie?.imdb_code ?? movie.id}
                image={pathToImageUrl(movie.poster_path)}
                title={`(${movie.character}) in ${movie.title}`}
              ></MovieItem>
            ))}
          </ul>
        </>
      </>
    );
  } else {
    return <Error></Error>;
  }
};

export default ActorDetails;

export const loader = async ({ params }) => {
  try {
    const response = await fetch(
      `${tmdbBaseUrl}person/${params.id}?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response;
  } catch (e) {
    throw json({ message: "Something went Worng", status: 400 });
  }
};
