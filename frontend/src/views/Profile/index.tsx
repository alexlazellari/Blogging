import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useAuth } from "src/context/AuthContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Profile() {
  // Make use of useAuth to get the user object
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  // We need to know if the user is editing the profile and which field they are editing
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const onEdit = (field: string): void => {
    setEditingField(field);
  };

  const onSave = (): void => {
    setEditingField(null);
  };

  if (!user) return null;

  return (
    <Container disableGutters>
      <Box
        mb={{
          xs: 2,
          sm: 3,
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Account & Settings
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
      </Box>
      <Grid
        sx={{
          border: "1px solid #f0f0f0",
          m: 0,
          mb: 3,
        }}
        container
        spacing={{
          xs: 2,
          sm: 3,
          md: 4,
        }}
      >
        <Grid xs={12}>
          <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Basic Details
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Avatar sx={{ width: 80, height: 80 }} />
            <Button
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
            >
              Change
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                label="First Name"
                autoComplete="off"
                margin="dense"
                fullWidth
                disabled={editingField !== "first_name"}
                defaultValue={user.firstName}
              />
              {editingField === "first_name" ? (
                <Button onClick={onSave}>Save</Button>
              ) : (
                <Button onClick={() => onEdit("first_name")}>Edit</Button>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                label="Last Name"
                fullWidth
                margin="dense"
                autoComplete="off"
                disabled={editingField !== "last_name"}
                defaultValue={user.lastName}
              />
              {editingField === "last_name" ? (
                <Button onClick={onSave}>Save</Button>
              ) : (
                <Button onClick={() => onEdit("last_name")} variant="text">
                  Edit
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid
        sx={{
          border: "1px solid #f0f0f0",
          m: 0,
        }}
        container
        spacing={{
          xs: 2,
          sm: 3,
          md: 4,
        }}
      >
        <Grid xs={12}>
          <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Delete Profile
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography paragraph>
            Delete your account and all of your source data. This is
            irreversible.
          </Typography>
          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <Button
              sx={{ fontWeight: "normal" }}
              disableElevation
              variant="contained"
              color="error"
            >
              Delete Account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
