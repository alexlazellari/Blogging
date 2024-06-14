import { Box, Button, Container } from "@mui/material";
import Comment from "../Comment";
import { useEffect, useState } from "react";
import { deleteComment, fetchComments, sendComment } from "src/service";
import { TComment } from "../../types";
import CommentForm from "../CommentForm";

interface Props {
  articleId: number;
}

export default function CommentList({ articleId }: Props) {
  const [comments, setComments] = useState<TComment[]>([]);
  const [comment, setComment] = useState("");
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

  const onCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await sendComment(articleId, comment);
    if (!data) return;
    setComments((prevComments) => [data, ...prevComments]);
    setComment("");
  };

  const onComment = (comment: string) => {
    setComment(comment);
  };

  return (
    <Container disableGutters>
      <CommentForm
        onCreate={onCreate}
        comment={comment}
        onComment={onComment}
      />
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
