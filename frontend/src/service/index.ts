import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ArticleType } from "src/types";

const serverUrl = import.meta.env.VITE_SERVER_URL;

console.log("Server URL:", serverUrl);

const client = axios.create({
  baseURL: serverUrl,
});

export type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: ArticleType[];
};

// Fetch articles from the server
export async function fetchArticles(): Promise<ArticleType[] | null> {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const response: AxiosResponse<ArticleResponse> = await client.get(
      `/articles`,
      config
    );

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      return response.data.articles;
    } else {
      console.error("Failed to fetch articles:", response.status);
      return null;
    }
  } catch (err) {
    // Handle errors from Axios
    if (axios.isAxiosError(err)) {
      console.error("Axios error.", "Code:", err.code, "Message:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    return null;
  }
}