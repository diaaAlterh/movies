import { useEffect } from "react";
import {
  useParams,
  useNavigate,
  json,
  useLoaderData,
  Link,
} from "react-router-dom";
import { getMovieDetails } from "../../app/movieDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/Error";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import LinearBuffer from "../../components/LinearBuffer";
import DetailsHeader from "../../components/DetailsHeader";
import RatingStar from "../../components/RatingStar";
import styles from "./MoviesPage.module.css";
import {
  pathToImageUrl,
  apiKey,
  ytsBaseUrl,
  tmdbBaseUrl,
} from "../../app/utils";
import YouTube from "react-youtube";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import SideTitle from "../../components/SideTitle";
import MovieItem from "./MovieItem";
import { useMediaQuery } from "@mui/material";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const matches = useMediaQuery("(min-width:800px)");
  const movie = data?.data?.movie;

  const movieDetails = useSelector((state) => state.movieDetails.movie);
  const error = useSelector((state) => state.movieDetails.error);
  const isLoading = useSelector((state) => state.movieDetails.isLoading);

  useEffect(() => {
    dispatch(getMovieDetails({ id: params.id }));
  }, [dispatch, params]);

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
  if (movie.title) {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="absoulte" style={{ backgroundColor: "#13161d" }}>
            <Toolbar>
              <Typography
                variant={matches ? "h5" : null}
                noWrap
                component="div"
                sx={{
                  width: "100%",
                  mx: "auto",
                }}
              >
                {movie.title_long ?? ""}
              </Typography>
              {movie.rating && (
                <RatingStar
                  rating={movie.rating}
                  id={movie.imdb_code}
                ></RatingStar>
              )}
            </Toolbar>
          </AppBar>
        </Box>
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
                  <YouTube
                    videoId={movieDetails.video.key}
                    opts={
                      matches
                        ? {
                            width: 600,
                            height: 500,
                          }
                        : {
                            width: 350,
                            height: 300,
                          }
                    }
                  />
                  {movieDetails.ids.twitter_id && (
                    <TwitterTimelineEmbed
                      sourceType="profile"
                      screenName={movieDetails.ids.twitter_id}
                      options={{ height: 500, width: matches ? 600 : 350 }}
                    />
                  )}
                </Stack>
              </>
            )}
            {movieDetails.recommendations.length !== 0 && (
              <SideTitle>
                Movies to watch if you like {movieDetails?.movie.title}
              </SideTitle>
            )}
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

            {movieDetails.cast.length !== 0 && (
              <SideTitle>{movieDetails?.movie.title} Popular Actors:</SideTitle>
            )}
            <ul className={styles.movieGrid}>
              {movieDetails.cast.map((actor) => (
                <Link key={actor.id} to={`/actor/${actor.id}`}>
                  <MovieItem
                    image={pathToImageUrl(actor.profile_path)}
                    title={`${actor.character} (${actor.name})`}
                  ></MovieItem>
                </Link>
              ))}
            </ul>
          </>
        )}
      </>
    );
  } else {
    return <Error></Error>;
  }
};

export default MovieDetails;

export const loader = async ({ params }) => {
  try {
    const ytsResponse = await fetch(
      `${ytsBaseUrl}movie_details.json?imdb_id=${params.id}`
    );

    if (!ytsResponse.ok) {
      throw new Error("Something went wrong");
    }
    return ytsResponse;
  } catch (e) {
    throw json({ message: "Something went Worng", status: 400 });
  }
};
