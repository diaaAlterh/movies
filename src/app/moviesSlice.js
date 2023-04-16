import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ytsBaseUrl } from "./utils";

const initialMoviesState = {
  movies: [],
  isLoading: false,
  page: 1,
  pagesCount: 1,
  search: "",
  error: "",
};

export const getMovies = createAsyncThunk("movies", async (props) => {
  try {
    const response = await fetch(
      props.search
        ? `${ytsBaseUrl}list_movies.json?query_term=${props.search}&limit=50&sort_by=like_count&genre=${props?.genre??''}`
        : `${ytsBaseUrl}list_movies.json?limit=50&sort_by=like_count&page=${props.page}&minimum_rating=6&genre=${props?.genre??''}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data?.data ?? {};
  } catch (error) {
    return error.toString();
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    updateData(state, actions) {
      state.page = actions.payload.page;
      state.search = actions.payload.search;
    },
  },
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.movies ?? [];
      state.error = "";
      state.pagesCount = ((action.payload?.movie_count ?? 50) / 50).toFixed();
    },
    [getMovies.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default moviesSlice;
