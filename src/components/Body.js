import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Movie from "./Movie";
import StarredMovies from "./StarredMovies";
const Body = () => {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },{
      path: "/starred",
      element: <StarredMovies />,
    }, 
    {
      path: "/movie/:id",
      element: <Movie />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default Body;
