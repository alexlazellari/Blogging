import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Button
      component={Link}
      to="/"
      sx={{
        color: "text.primary",
        fontWeight: "bold",
        fontSize: "1.25rem",
      }}
      disableElevation
    >
      <i>Hello</i>
      <Box
        component="span"
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          p: 0.25,
          px: 1,
          borderRadius: "5px",
          ml: 0.75,
        }}
      >
        Blog
      </Box>
    </Button>
  );
}
