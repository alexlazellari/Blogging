import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Footer from "src/components/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Box sx={{ margin: { xs: "1rem" } }}>
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 1rem)",
          maxWidth: "1280px",
          margin: "auto",
        }}
      >
        <Toolbar sx={{ height: "2rem" }} />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
