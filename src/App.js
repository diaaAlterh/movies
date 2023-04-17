import React from "react";
import MoviesPage from "./features/movies/MoviesPage";
import MovieDetails, {
  loader as detailsLoader,
} from "./features/movies/MovieDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import HomePage from "./features/app/HomePage";
import ActorDetails, {
  loader as actorDetailsLoader,
} from "./features/movies/ActorDetails";

import MovieImages, {
  loader as imagesLoader,
} from "./features/movies/MovieImages";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage></HomePage>,
      errorElement: <Error></Error>,
      children: [
        { index: true, element: <MoviesPage></MoviesPage> },
        { path: "/genres/:genre", element: <MoviesPage></MoviesPage> },
        {
          path: "/:id",
          element: <MovieDetails></MovieDetails>,
          loader: detailsLoader,
        },
        {
          path: "/:id/images",
          element: <MovieImages></MovieImages>,
          loader: imagesLoader,
        },
        {
          path: "/actor/:id",
          element: <ActorDetails></ActorDetails>,
          loader: actorDetailsLoader,
        },
        {
          path: "/actor/:id/images",
          element: <MovieImages></MovieImages>,
          loader: imagesLoader,
        },
      ],
    },
  ],{basename:"/movies"});

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

///you can use Form from react router and use action function and useNavigation to know the status redirect
