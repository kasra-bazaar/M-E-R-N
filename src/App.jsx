import { Navigate, RouterProvider } from "react-router-dom";

import { Suspense } from "react";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner.jsx";
import { createBrowserRouter } from "react-router-dom";

import React from "react";
import useAuth from "./hooks/useAuth.jsx";

const Users = React.lazy(() => import("./users/pages/Users"));
const NewPlaces = React.lazy(() => import("./places/pages/NewPlace"));
const MainNavigation = React.lazy(() =>
  import("./shared/components/Navigation/MainNavigation")
);
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./users/pages/Auth"));

export default function App() {
  const { isLogedIn } = useAuth();
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainNavigation />,
      children: [
        {
          path: "/",
          element: <Users />,
        },
        {
          path: "/places/new",
          element: isLogedIn ? <NewPlaces /> : <Navigate to="/" />,
        },
        {
          path: "/:userId/places",
          element: <UserPlaces />,
        },
        {
          path: "places/:placeId",

          element: isLogedIn ? <UpdatePlace /> : <Navigate to="/" />,
        },
        {
          path: "/auth",

          element: <Auth />,
        },
      ],
    },
  ]);
  return (
    <Suspense
      fallback={
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      }
    >
      <RouterProvider router={Router} />
    </Suspense>
  );
}
