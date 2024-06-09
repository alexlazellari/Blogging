import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { TComment } from "src/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import Delete from "@mui/icons-material/Delete";
import { useAuth } from "src/context/AuthContext";

export function timeFromNow(date: string) {
  const now = new Date();
  const created = new Date(date);
  const diff = now.getTime() - created.getTime();
  const diffInSeconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    return `${diffInDays}d`;
  }
}

interface Props {
  comment: TComment;
  onDelete: (commentId: number) => void;
}

export default function Comment({ comment, onDelete }: Props) {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container disableGutters sx={{ mb: 1.5 }}>
      <Stack direction="row" alignItems="center">
        <Avatar
          sx={{
            width: 32,
            height: 32,
            mr: 1,
            alignSelf: "flex-start",
          }}
          src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${comment.user.username}`}
          alt={`Avatar for ${comment.user.firstName} ${comment.user.lastName}`}
        />
        <Stack>
          <Box
            sx={{
              display: "inline-block",
              backgroundColor: "grey.100",
              borderRadius: 1,
              py: 0.5,
              px: 1.5,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {comment.user.firstName} {comment.user.lastName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                display: "inline-block",
              }}
            >
              {comment.content}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", px: 1.5 }}
          >
            {timeFromNow(comment.created)}
          </Typography>
        </Stack>

        {user && comment.userId === user.id && (
          <Box
            sx={{
              alignSelf: "flex-start",
              ml: 1,
            }}
          >
            <IconButton
              aria-label="settings"
              onClick={(event) => handleClick(event)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
              <MenuItem
                onClick={() => {
                  onDelete(comment.id);
                }}
              >
                <Delete color="error" sx={{ mr: 1 }} />
                Delete
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
