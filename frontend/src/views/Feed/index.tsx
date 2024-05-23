import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import ArticleForm from "src/components/ArticleForm";
import ArticleList from "src/components/ArticleList";
import { fetchArticles } from "src/service";
import { ArticleType } from "src/types";

export default function Feed() {
  const [articles, setArticles] = useState<ArticleType[] | null>([]);

  useEffect(() => {
    fetchArticles().then((data) => {
      console.log(data);
      setArticles(data);
    });
  }, []);

  return (
    <Container disableGutters>
      <ArticleForm />
      <ArticleList articles={articles} />
    </Container>
  );
}
