import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { ArticleType } from "src/types";

interface Props {
  article: ArticleType;
}

export default function Article({ article }: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #d2d2d2",
        mb: 2,
      }}
    >
      <CardHeader
        avatar={
          <CardHeader
            avatar={
              <Avatar
                src={`https://avatars.dicebear.com/api/micah/${article.user.username}.svg`}
                alt={`Avatar for ${article.user.firstName}`}
              />
            }
            title={`${article.user.firstName} ${article.user.lastName}`}
            subheader={new Date(article.created)
              .toUTCString()
              .replace("GMT", "")}
          />
        }
        title={`${article.user.firstName} ${article.user.lastName}`}
        subheader={new Date(article.created).toUTCString().replace("GMT", "")}
      />
      <CardContent>
        <Typography variant="h5" component="h3">
          {article.title}
        </Typography>
        <Typography variant="body1">{article.content}</Typography>
      </CardContent>
    </Card>
  );
}
