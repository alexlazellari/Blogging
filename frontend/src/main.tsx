import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import NotFound from "src/views/Error";
import Root from "src/layouts/Root";
import Feed from "src/views/Feed";
import "./index.css";
import Profile from "src/views/Profile";
import Login from "./views/Login";
import Protected from "./components/Protected";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./views/Landing";
import Visitor from "./layouts/Visitor";
import PrivacyPolicy from "./views/legal-pages/PrivacyPolicy";
import CookiePolicy from "./views/legal-pages/CookiePolicy";
import Disclaimer from "./views/legal-pages/Disclaimer";
import TermsOfService from "./views/legal-pages/TermsOfService";

export const AppRouter = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div></div>;
  }

  let routes = [];

  if (user) {
    routes = [
      {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Protected component={Feed} />,
          },
          {
            path: "profile",
            element: <Protected component={Profile} />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ];
  } else {
    routes = [
      {
        path: "/",
        element: <Visitor />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Landing />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "cookie-policy",
            element: <CookiePolicy />,
          },
          {
            path: "disclaimer",
            element: <Disclaimer />,
          },
          {
            path: "terms-of-service",
            element: <TermsOfService />,
          },
        ],
      },
    ];
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

const theme = createTheme({
  palette: {
    mode: "light",
    contrastThreshold: 4.5,
  },
  typography: {
    fontSize: 12, // This sets the base font size to 12px
    h1: {
      fontSize: "2.5rem", // approximately 30px
    },
    h2: {
      fontSize: "2.25rem", // approximately 27px
    },
    h3: {
      fontSize: "2rem", // approximately 24px
    },
    h4: {
      fontSize: "1.75rem", // approximately 21px
    },
    h5: {
      fontSize: "1.5rem", // approximately 18px
    },
    h6: {
      fontSize: "1.25rem", // approximately 15px
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
