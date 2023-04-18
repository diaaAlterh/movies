import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import movieDetailsSlice from "./movieDetailsSlice";
import uiSlice from "./uiSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    movieDetails: movieDetailsSlice.reducer,
    ui: uiSlice.reducer,
  },
});
