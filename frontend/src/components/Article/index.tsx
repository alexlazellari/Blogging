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
  Stack,
  Container,
  TextField,
  Popover,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "src/context/AuthContext";
import {
  deleteArticle,
  likeArticle,
  sendComment,
  unlikeArticle,
} from "src/service";
import { TArticle } from "src/types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import CommentList from "../CommentList";
import MyAvatar from "../MyAvatar";

interface Props {
  article: TArticle;
}

export default function Article({ article }: Props) {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLiked, setIsLiked] = useState(article.isLikedByUser);
  const [isFullText, setIsFullText] = useState(false);
  const [anchorEmoji, setAnchorEmoji] = React.useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);
  const textLimit = 200; // Adjust the character limit as needed
  const openEmoji = Boolean(anchorEmoji);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  console.log(showComments);

  const onLike = (articleId: number) => {
    likeArticle(articleId);
    setIsLiked(true);
  };

  const onUnlike = (articleId: number) => {
    unlikeArticle(articleId);
    setIsLiked(false);
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

  const onEmojiPickerClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEmoji(event.currentTarget);
  };

  const onCloseEmojiPicker = () => {
    setAnchorEmoji(null);
  };

  const onSend = () => {
    sendComment(article.id, comment);
    setComment("");
  };

  const onComment = () => {
    setShowComments(true);
  };

  const displayContent =
    article.content.length > textLimit && !isFullText
      ? `${article.content.substring(0, textLimit)}...`
      : article.content;

  return (
    <Container
      disableGutters
      sx={{
        mb: 4,
        boxShadow: "0 1px 2px 0 rgba(0,0,0,.05)",
        border: "1px solid #d2d2d2",
        borderRadius: 1,
        p: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
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
          sx={{
            p: 0,
            mb: 1.5,
          }}
        />
        <CardContent sx={{ p: 0, mb: 2 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
            {article.title}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {displayContent}
            {article.content.length > textLimit && (
              <Button size="small" onClick={toggleFullText}>
                {isFullText ? "Read Less" : "Read More"}
              </Button>
            )}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            p: 0,
          }}
        >
          <Stack
            direction="column"
            spacing={1}
            sx={{
              width: "100%",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">
                {article.totalLikes === 1
                  ? "1 like"
                  : article.totalLikes === 0
                  ? ""
                  : `${article.totalLikes} likes`}
              </Typography>
              <Typography color="text.secondary">
                {article.totalComments === 1
                  ? "1 comment"
                  : article.totalComments === 0
                  ? ""
                  : `${article.totalComments} comments`}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" spacing={1}>
              <Button
                color="error"
                startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={() =>
                  isLiked ? onUnlike(article.id) : onLike(article.id)
                }
                size="small"
                sx={{
                  flex: 1,
                }}
              >
                Like
              </Button>
              <Button
                size="small"
                startIcon={<CommentOutlinedIcon />}
                onClick={() => onComment()}
                sx={{
                  flex: 1,
                }}
              >
                Comment
              </Button>
            </Stack>
            <Divider />
          </Stack>
        </CardActions>
      </Card>
      <Container disableGutters>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 2,
          }}
        >
          <MyAvatar width={36} height={36} />
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            size="small"
            placeholder="Comment"
          />
          <Stack
            sx={{
              alignSelf: "flex-end",
            }}
            direction="row"
            spacing={1}
          >
            <IconButton onClick={onEmojiPickerClick}>
              <EmojiEmotionsOutlinedIcon />
            </IconButton>
            <Popover
              open={openEmoji}
              anchorEl={anchorEmoji}
              onClose={onCloseEmojiPicker}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              elevation={0}
            >
              <EmojiPicker
                searchDisabled
                skinTonesDisabled
                emojiStyle={EmojiStyle.NATIVE}
                onEmojiClick={(emojiObject) => {
                  setComment(comment + emojiObject.emoji);
                }}
              />
            </Popover>
            <IconButton onClick={onSend}>
              <SendIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
      {showComments && <CommentList articleId={article.id} />}
    </Container>
  );
}
