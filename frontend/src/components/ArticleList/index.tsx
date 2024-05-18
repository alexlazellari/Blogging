import { Container } from "@mui/material";
import Article from "src/components/Article";
import { ArticleType } from "src/types";

interface Props {
  articles: ArticleType[];
}

export default function ArticleList({ articles }: Props) {
  return (
    <Container>
      {articles.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </Container>
  );
}