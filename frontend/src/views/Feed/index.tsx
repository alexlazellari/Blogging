import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import ArticleForm from "src/components/ArticleForm";
import ArticleList from "src/components/ArticleList";
import { fetchArticles } from "src/service";
import { TArticle } from "src/types";

export default function Feed() {
  const [articles, setArticles] = useState<TArticle[] | null>([]);

  useEffect(() => {
    fetchArticles().then((data) => {
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
