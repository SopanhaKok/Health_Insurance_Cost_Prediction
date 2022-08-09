import { Box, Typography } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { RouteObject, useLocation, useRoutes } from "react-router-dom";
import Home from "pages";
import LoadingLayout from "components/LoadingLayout";
import GuestGuard from "guards/guest";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingLayout loading={true} children={null} />}>
      <Component {...props} />
    </Suspense>
  );
};

const LazyLoad = (path: string) =>
  Loadable(lazy(() => import(`pages/${path}`)));

export default function AppRoutes() {
  return useRoutes([
    {
      path: "",
      element: <GuestGuard />,
      children: [{ path: "", element: <LandingPage /> }],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
}

const LandingPage = LazyLoad("index");

const NotFoundPage = LazyLoad("404");
