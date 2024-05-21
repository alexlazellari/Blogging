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
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "profile",
        element: <Protected element={Profile} />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: "light",
    contrastThreshold: 4.5,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
