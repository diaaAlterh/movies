import React from "react";
import MoviesPage from "./features/movies/MoviesPage";
import MovieDetails from "./features/movies/MovieDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import HomePage from "./features/app/HomePage";

import MovieImages, {
  loader as imagesLoader,
} from "./features/movies/MovieImages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <MoviesPage></MoviesPage> },
      {
        path: "movies/:id",
        element: <MovieDetails></MovieDetails>,
      },
      {
        path: "movies/:id/images",
        element: <MovieImages></MovieImages>,
        loader: imagesLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
