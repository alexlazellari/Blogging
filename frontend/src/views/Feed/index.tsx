import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import ArticleForm from "src/components/ArticleForm";
import ArticleList from "src/components/ArticleList";
import { createArticle, fetchArticles } from "src/service";
import { TArticle } from "src/types";

export type THelperText = {
  success: boolean;
  message: string;
};

export default function Feed() {
  const [articles, setArticles] = useState<TArticle[]>([]);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data || []);
    });
  }, []);

  const onSubmit = async (
    title: string,
    content: string
  ): Promise<TArticle | null> => {
    const article = await createArticle({
      title,
      content,
    });

    if (!article) return null;

    setArticles([article, ...articles]);
    return article;
  };

  return (
    <Container disableGutters>
      <ArticleForm onSubmit={onSubmit} />
      <ArticleList articles={articles} />
    </Container>
  );
}
