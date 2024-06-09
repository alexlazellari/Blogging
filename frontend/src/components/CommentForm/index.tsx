import {
  Container,
  Divider,
  IconButton,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import MyAvatar from "../MyAvatar";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useState } from "react";

interface Props {
  onCreate: (event: React.FormEvent<HTMLFormElement>) => void;
  comment: string;
  onComment: (comment: string) => void;
}

export default function CommentForm({ onCreate, comment, onComment }: Props) {
  const [anchorEmoji, setAnchorEmoji] = useState<HTMLElement | null>(null);

  const openEmoji = Boolean(anchorEmoji);

  const onEmojiPickerClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEmoji(event.currentTarget);
  };

  const onCloseEmojiPicker = () => {
    setAnchorEmoji(null);
  };

  return (
    <Container
      disableGutters
      sx={{
        my: 3,
      }}
    >
      <form onSubmit={onCreate}>
        <Stack direction="row" spacing={1}>
          <MyAvatar width={36} height={36} />
          <TextField
            value={comment}
            onChange={(e) => onComment(e.target.value)}
            fullWidth
            multiline
            size="small"
            placeholder="Comment on this article..."
            required
          />
          <Stack
            sx={{
              alignSelf: "flex-end",
            }}
            direction="row"
            spacing={1}
          >
            <IconButton onClick={onEmojiPickerClick}>
              <EmojiEmotionsOutlinedIcon color="warning" />
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
                  onComment(comment + emojiObject.emoji);
                }}
              />
            </Popover>
            <IconButton type="submit">
              <SendIcon color={comment.length > 0 ? "primary" : "disabled"} />
            </IconButton>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
