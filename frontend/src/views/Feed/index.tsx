import { useEffect, useState } from "react";
import ArticleList from "src/components/ArticleList";
import { fetchArticles } from "src/service";
import { ArticleType } from "src/types";

export default function Feed() {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data);
    });
  }, []);

  return <ArticleList articles={articles} />;
}
