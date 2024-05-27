import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./AppRouter";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#18181b",
    },
    text: {
      primary: "#18181b",
      secondary: "#565656",
    },
    contrastThreshold: 4.5,
  },
  typography: {
    fontSize: 12,
    h1: { fontSize: "2.5rem" },
    h2: { fontSize: "2.25rem" },
    h3: { fontSize: "2rem" },
    h4: { fontSize: "1.75rem" },
    h5: { fontSize: "1.5rem" },
    h6: { fontSize: "1.25rem" },
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
