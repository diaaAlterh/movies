import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialMoviesState = {
  movies: [],
  isLoading: true,
  page: 1,
  pagesCount: 1,
  search: "",
  error: "",
};

export const getMovies = createAsyncThunk("movies", async (props) => {
  try {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?query_term=${props.search}&limit=50&sort_by=download_count&page=${props.page}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data?.data??{};
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
      state.movies = action.payload.movies??[];
      state.error="";
      state.pagesCount=((action.payload?.movie_count ?? 50) / 50).toFixed()
    },
    [getMovies.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default moviesSlice;
