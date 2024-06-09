import { Container } from "@mui/material";
import Article from "src/components/Article";
import { TArticle } from "src/types";

interface Props {
  articles: TArticle[] | null;
}

export default function ArticleList({ articles }: Props) {
  return (
    <Container disableGutters>
      {articles &&
        articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
    </Container>
  );
}
