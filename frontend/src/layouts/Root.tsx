import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import ComplexAppBar from "src/components/ComplexAppBar";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Root() {
  // Give me a function that get the query and return the result
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box sx={{ margin: { xs: "1rem" } }}>
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 1rem)",
          width: matches ? "calc(100% - 64px)" : "100%",
          marginLeft: "auto",
        }}
      >
        <ComplexAppBar />
        <Toolbar
          sx={{
            minHeight: {
              xs: "4rem",
            },
          }}
        />
        <Outlet />
        <Toolbar
          sx={{
            minHeight: {
              xs: "1.5rem",
            },
          }}
        />
      </Box>
    </Box>
  );
}
