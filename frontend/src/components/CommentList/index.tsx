import { Box, Button, Container } from "@mui/material";
import Comment from "../Comment";
import { useEffect, useState } from "react";
import { deleteComment, fetchComments } from "src/service";
import { TComment } from "../../types";

interface Props {
  articleId: number;
}

export default function CommentList({ articleId }: Props) {
  const [comments, setComments] = useState<TComment[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      const newComments = await fetchComments(articleId, offset);
      setComments((prevComments) => [...prevComments, ...(newComments || [])]);
    };
    getComments();
  }, [articleId, offset]);

  const onGetMore = async () => {
    setOffset(offset + 5);
  };

  const onDelete = async (commentId: number) => {
    const isDeleted = await deleteComment(commentId);

    if (isDeleted) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    }
  };

  return (
    <Container disableGutters>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onDelete={onDelete} />
        ))}
      <Box sx={{ textAlign: "right" }}>
        <Button variant="text" onClick={onGetMore} size="small">
          Get more
        </Button>
      </Box>
    </Container>
  );
}
