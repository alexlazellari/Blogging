import { Card, CardContent, Typography } from "@mui/material";
import { ArticleType } from "src/types";

interface Props {
  article: ArticleType;
}

export default function Article({ article }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h3">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.date}
        </Typography>
        <Typography variant="body1">{article.content}</Typography>
      </CardContent>
    </Card>
  );
}
