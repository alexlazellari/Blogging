import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { login } from "src/service";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const response = await login(username, password);

    // after successful login, redirect to feed don't refresh the page
    if (response) {
      window.location.href = "/";
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 11rem)",
        minHeight: "31.25rem",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{ fontWeight: "normal", textAlign: "center" }}
        >
          Login
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: "center", mb: 4 }}>
          Enter your username below to login to your account.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            required
            margin="dense"
            autoComplete="off"
            name="username"
            fullWidth
          />
          <FormControl margin="dense" fullWidth variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Box sx={{ mb: 4, display: "inline-block" }} component="span">
            Username: admin, Password: password
          </Box>
          <Button variant="contained" type="submit" fullWidth disableElevation>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
