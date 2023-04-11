import React from "react";
import MoviesPage from "./features/movies/MoviesPage";
import MoviesDetatils from "./features/movies/MovieDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <MoviesPage></MoviesPage> },
  { path: "/movies/:id", element: <MoviesDetatils></MoviesDetatils> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
