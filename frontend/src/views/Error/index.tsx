import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError() as any;
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 128px)",
        p: 2,
      }}
    >
      <Grid item>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ maxWidth: 500, margin: "auto" }}>
            <img src="../../../404.svg" alt="404" />
          </Box>
        </Box>
        <Typography>
          Error: <i>{error?.statusText || error?.message}</i>
        </Typography>
        <Card>
          <CardHeader
            title="The page you were looking for doesn't exist."
            subheader="You may have mistyped the address or the page may have moved."
            sx={{ textAlign: "center" }}
          />
          <CardActions sx={{ justifyContent: "center", mb: 1 }}>
            <Button variant="outlined" component={Link} to={"/"}>
              Go to Home
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default NotFound;
