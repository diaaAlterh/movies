import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiKey, compareArrays,tmdbBaseUrl } from "./utils";

const initialMoviesState = {
  movie: {},
  isLoading: true,
  error: "",
};

export const getMovieDetails = createAsyncThunk("movies", async ({ id }) => {
  try {
    const idResponse = await fetch(
      `${tmdbBaseUrl}movie/${id}/external_ids?api_key=${apiKey}`
    );

    if (!idResponse.ok) {
      throw new Error("Something went wrong");
    }
    const idData = await idResponse.json();

    const creditsResponse = await fetch(
      `${tmdbBaseUrl}movie/${idData.id}/credits?api_key=${apiKey}`
    );

    if (!creditsResponse.ok) {
      throw new Error("Something went wrong");
    }

    const creditsData = await creditsResponse.json();

    const movieResponse = await fetch(
      `${tmdbBaseUrl}movie/${idData.id}?api_key=${apiKey}`
    );

    if (!movieResponse.ok) {
      throw new Error("Something went wrong");
    }

    const movieData = await movieResponse.json();

    const genresIds = movieData.genres.map((item) => item.id);

    const recommendationsResponse = await fetch(
      `${tmdbBaseUrl}movie/${idData.id}/recommendations?api_key=${apiKey}`
    );

    if (!recommendationsResponse.ok) {
      throw new Error("Something went wrong");
    }

    const recommendationsData = await recommendationsResponse.json();

    const videoResponse = await fetch(
      `${tmdbBaseUrl}movie/${idData.id}/videos?api_key=${apiKey}`
    );

    if (!videoResponse.ok) {
      throw new Error("Something went wrong");
    }

    const videosData = await videoResponse.json();

    const bestVideo =
      videosData.results.find(
        (item) => item.site === "YouTube" && item.name.includes("Official")
      ) || videosData.results[0];

    return {
      movie: movieData,
      ids: idData,
      cast: creditsData.cast.filter((actor)=>{return actor.profile_path!==null}).slice(0,14),
      video: bestVideo,
      recommendations: recommendationsData.results.filter((movie) => {
        return compareArrays(genresIds, movie.genre_ids)&&movie.backdrop_path !== null&&movie.vote_count>1000;;
      }),
    };
  } catch (error) {
    return error.toString();
  }
});

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: initialMoviesState,
  extraReducers: {
    [getMovieDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovieDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movie = action.payload ?? {};
      state.error = "";
    },
    [getMovieDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default movieDetailsSlice;
