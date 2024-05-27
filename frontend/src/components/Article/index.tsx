import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "src/context/AuthContext";
import { deleteArticle, likeArticle, unlikeArticle } from "src/service";
import { ArticleType } from "src/types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  article: ArticleType;
}

export default function Article({ article }: Props) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFullText, setIsFullText] = useState(false);
  const open = Boolean(anchorEl);
  const textLimit = 200; // Adjust the character limit as needed

  const onLike = (articleId: number) => {
    likeArticle(articleId);

    setLiked(true);
  };

  const onUnlike = (likeId: number) => {
    unlikeArticle(likedId);

    setLiked(false);
  };

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onDelete = (articleId: number) => {
    console.log(`Deleting article with id ${articleId}`);
    deleteArticle(articleId);
  };

  const toggleFullText = () => {
    setIsFullText(!isFullText);
  };

  const displayContent =
    article.content.length > textLimit && !isFullText
      ? `${article.content.substring(0, textLimit)}...`
      : article.content;

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d2d2d2",
        mb: 2,
      }}
    >
      <CardHeader
        title={`${article.user.firstName} ${article.user.lastName}`}
        subheader={new Date(article.created).toUTCString().replace("GMT", "")}
        avatar={
          <Avatar
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
            src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${article.user.username}`}
            alt={`Avatar for ${article.user.firstName}`}
          />
        }
        action={
          user && user.id === article.user.id ? (
            <div>
              <IconButton aria-label="settings" onClick={onMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => onDelete(article.id)}>
                  <DeleteIcon color="error" sx={{ mr: 1 }} />
                  Delete
                </MenuItem>
              </Menu>
            </div>
          ) : null
        }
      />
      <CardContent>
        <Typography variant="h5" component="h3">
          {article.title}
        </Typography>
        <Typography variant="body1">
          {displayContent}
          {article.content.length > textLimit && (
            <Button size="small" onClick={toggleFullText}>
              {isFullText ? "Read Less" : "Read More"}
            </Button>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="error"
          startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          onClick={() => (liked ? onUnlike(article.id) : onLike(article.id))}
          size="small"
        >
          Love
        </Button>
        <Button size="small">Comment</Button>
      </CardActions>
    </Card>
  );
}
