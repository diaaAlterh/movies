import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../app/movieDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/Error";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import LinearBuffer from "../../components/LinearBuffer";
import DetailsHeader from "../../components/DetailsHeader";
import RatingStar from "../../components/RatingStar";
import styles from "./MoviesPage.module.css";
import { pathToImageUrl, apiKey } from "../../app/utils";
import YouTube from "react-youtube";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import SideTitle from "../../components/SideTitle";
import MovieItem from "./MovieItem";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const movieDetails = useSelector((state) => state.movieDetails.movie);
  const error = useSelector((state) => state.movieDetails.error);
  const isLoading = useSelector((state) => state.movieDetails.isLoading);

  useEffect(() => {
    dispatch(getMovieDetails({ id: params.id }));
  }, [dispatch, params]);

  if (error) {
    return <Error></Error>;
  }

  const handleClick = async (id) => {
    try {
      const idResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${apiKey}`
      );

      if (!idResponse.ok) {
        throw new Error("Something went wrong");
      }
      const idData = await idResponse.json();
      console.log(idData);
      navigate(`/movies/${idData.imdb_id}`);
    } catch (error) {}
  };

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
              {movieDetails?.yts?.title_long ?? ""}
            </Typography>
            {movieDetails?.yts?.rating && (
              <RatingStar
                rating={movieDetails?.yts?.rating}
                id={movieDetails?.yts?.imdb_code}
              ></RatingStar>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box height="65px"></Box>
      {isLoading && <LinearBuffer></LinearBuffer>}

      {!isLoading && !error && movieDetails?.movie && (
        <>
          <DetailsHeader movieDetails={movieDetails}></DetailsHeader>
          {movieDetails?.video?.key && (
            <>
              <SideTitle>
                {movieDetails?.movie.title} Trailer
                {movieDetails.ids.twitter_id && " & Tweets"}:
              </SideTitle>

              <Stack
                direction="row"
                flexWrap="wrap"
                paddingTop="50px"
                paddingBottom="50px"
                justifyContent="center"
                alignItems="center"
                useFlexGap
                spacing={{ xs: 1, sm: 4 }}
              >
                <YouTube videoId={movieDetails.video.key} />
                {movieDetails.ids.twitter_id && (
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName={movieDetails.ids.twitter_id}
                    options={{ height: 500, width: 600 }}
                  />
                )}
              </Stack>
            </>
          )}
          <SideTitle>
            Movies to watch if you like {movieDetails?.movie.title}
          </SideTitle>
          <ul className={styles.movieGrid}>
            {movieDetails.recommendations.map((movie) => (
              <MovieItem
                onClick={() => {
                  handleClick(movie.id);
                }}
                key={movie?.imdb_code ?? movie.id}
                image={pathToImageUrl(movie.poster_path)}
                title={movie.title}
              ></MovieItem>
            ))}
          </ul>

          <SideTitle>{movieDetails?.movie.title} Popular Actors:</SideTitle>
          <ul className={styles.movieGrid}>
            {movieDetails.cast.map((actor) => (
              <MovieItem
                key={actor.id}
                image={pathToImageUrl(actor.profile_path)}
                title={`${actor.character}\n(${actor.name}`}
              ></MovieItem>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default MovieDetails;
