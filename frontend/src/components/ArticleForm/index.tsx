import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createArticle } from "src/service";
import HelperTextAlert from "../HelperTextAlert";
import MyAvatar from "../MyAvatar";
import { TArticle } from "src/types";

export type HelperTextType = {
  success: boolean;
  message: string;
};

interface Props {
  onSubmit: (title: string, content: string) => Promise<TArticle | null>;
}

export default function ArticleForm({ onSubmit }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<HelperTextType>({
    success: false,
    message: "",
  });
  const [openHelperText, setOpenHelperText] = useState<boolean>(false);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Set loading state to true
    setIsLoading(true);

    const article = await onSubmit(title, content);

    if (article) {
      setTitle("");
      setContent("");
      setHelperText({
        success: true,
        message: "Article created.",
      });
      setOpenHelperText(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setHelperText({
        success: false,
        message: "Failed to create article.",
      });
      setOpenHelperText(true);
    }
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };

  const onCloseHelperText = () => {
    setOpenHelperText(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        fullWidth
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          p: 2,
          border: "1px solid rgba(0,0,0,0.2)",
        }}
        onClick={handleClickOpen}
      >
        {<MyAvatar />}
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {" "}
          Do you have any thoughts?
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          border: "1px solid #d2d2d2",
          p: 2,
          "& .MuiDialog-paper": {
            m: 0,
          },
        }}
      >
        <form onSubmit={onFormSubmit}>
          <DialogTitle
            sx={{
              textAlign: "center",
            }}
          >
            Share a though
          </DialogTitle>
          <DialogContent>
            <TextField
              size="small"
              margin="dense"
              label="Title"
              variant="standard"
              fullWidth
              value={title}
              onChange={onChangeTitle}
              disabled={isLoading}
              autoComplete="off"
              required
            />
            <TextField
              size="small"
              label="Content"
              fullWidth
              margin="dense"
              variant="standard"
              rows={3}
              multiline
              value={content}
              onChange={onChangeContent}
              disabled={isLoading}
              sx={{
                mb: 2,
              }}
              required
            />
            <Button
              disabled={isLoading}
              type="submit"
              size="small"
              variant="contained"
              disableElevation
              fullWidth
            >
              Post
            </Button>
          </DialogContent>
          <HelperTextAlert
            open={openHelperText}
            handleClose={onCloseHelperText}
            helperText={helperText}
          />
        </form>
      </Dialog>
    </>
  );
}
