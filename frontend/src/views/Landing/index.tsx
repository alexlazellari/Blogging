import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 11rem)",
        minHeight: "31.25rem",
      }}
      className="relative w-full bg-white"
    >
      {/* Radial gradient for the container to give a faded look */}
      <Box className="absolute h-full w-full flex flex-col justify-center items-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "3rem",
              md: "4rem",
            },
            fontWeight: "bold",
            textAlign: "center",
          }}
          gutterBottom
        >
          Welcome to Hello Blog!
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "3rem",
            },
            textAlign: "center",
            mb: 3,
          }}
        >
          Your source for the latest in blogs.
        </Typography>
        <Divider sx={{ width: "100%", mb: 3 }} />
        <Typography
          component="p"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            textAlign: "center",
            mb: 3,
          }}
        >
          Stay updated with the latest happenings around the world as they
          unfold.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          size="large"
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}
