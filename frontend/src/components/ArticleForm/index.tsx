import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createArticle } from "src/service";
import HelperTextAlert from "../HelperTextAlert";

export type HelperTextType = {
  success: boolean;
  message: string;
};

export default function ArticleForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<HelperTextType>({
    success: false,
    message: "",
  });
  const [openHelperText, setOpenHelperText] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Set loading state to true
    setIsLoading(true);

    // Call the API to create a new article
    const article = await createArticle({
      title,
      content,
    });

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

  return (
    <Paper
      sx={{
        mb: 4,
        border: "1px solid #d2d2d2",
        p: 2,
      }}
      elevation={0}
    >
      <form onSubmit={onSubmit} style={{ marginBottom: "1rem" }}>
        <Typography
          sx={{
            fontSize: "1.25rem",
            textAlign: "center",
          }}
        >
          Create a post
        </Typography>
        <TextField
          size="small"
          margin="dense"
          label="Title"
          variant="outlined"
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
          variant="outlined"
          rows={3}
          multiline
          value={content}
          onChange={onChangeContent}
          disabled={isLoading}
          required
        />
        <Button
          disabled={isLoading}
          type="submit"
          size="small"
          variant="contained"
        >
          Submit
        </Button>
      </form>
      <HelperTextAlert
        open={openHelperText}
        handleClose={onCloseHelperText}
        helperText={helperText}
      />
    </Paper>
  );
}
