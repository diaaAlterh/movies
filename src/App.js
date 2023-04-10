import React from "react";
import MoviesPage from "./features/movies/MoviesPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <MoviesPage></MoviesPage> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
