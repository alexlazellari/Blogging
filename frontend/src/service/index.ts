import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { TArticle, TComment, TFetchArticles, TUser } from "src/types";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
  },
};

const onError = (err: any) => {
  if (axios.isAxiosError(err)) {
    console.error("HTTP error response received:", err.response?.status);
    switch (err.response?.status) {
      case 400:
        console.error("Message: ", err.response?.data.message);
        break;
      case 401:
        console.error("Message: ", err.response?.data.message);
        break;
      case 404:
        console.error("Resource not found");
        break;
      case 429:
        console.error("Message: ", err.response?.data.message);
        break;
      case 500:
        console.error("Server error");
        break;
      default:
        console.error("Unexpected HTTP error:", err.status);
    }
  } else {
    console.error("Unexpected error:", err);
  }
};

// Fetch articles from the server
export async function fetchArticles(): Promise<TArticle[] | null> {
  try {
    const response: AxiosResponse<TFetchArticles> = await client.get(
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
    onError(err);
    return null;
  }
}

// Create a new article
export async function createArticle(
  article: Partial<TArticle>
): Promise<TArticle | null> {
  const data = article;

  try {
    const response: AxiosResponse<TArticle> = await client.post(
      `/articles`,
      data,
      config
    );

    // Check if the response status code is 201 (Created)
    if (response.status === 201) {
      return response.data;
    } else {
      console.error("Failed to create article:", response.status);
      return null;
    }
  } catch (err) {
    onError(err);
    return null;
  }
}

// Login to the server
export async function login(
  username: string,
  password: string
): Promise<boolean> {
  const data = {
    username,
    password,
  };

  try {
    const response: AxiosResponse = await client.post(
      `/auth/login`,
      data,
      config
    );

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to login:", response.status);
      return false;
    }
  } catch (err) {
    onError(err);
    return false;
  }
}

// Get the profile of the logged-in user
export async function getProfile(): Promise<Partial<TUser> | null> {
  try {
    const response: AxiosResponse = await client.get(`/auth/profile`, config);

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to get profile:", response.status);
      return null;
    }
  } catch (err) {
    onError(err);
    return null;
  }
}

// Check if the user is authenticated
export async function isAuth(): Promise<TUser | null> {
  try {
    const response: AxiosResponse = await client.get(`/auth/isAuth`, config);

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      // if (response.data.status === "ok") {
      return response.data.user;
      // } else {
      // return null;
      // }
    } else {
      console.error(
        "Failed to check if the user is authenticated:",
        response.status
      );
      return null;
    }
  } catch (err) {
    onError(err);
    return null;
  }
}

// Delete an article
export async function deleteArticle(id: number): Promise<boolean> {
  try {
    const response: AxiosResponse = await client.delete(
      `/articles/${id}`,
      config
    );

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to delete article:", response.status);
      return false;
    }
  } catch (err) {
    onError(err);
    return false;
  }
}

// Logout from the server
export async function logout(): Promise<boolean> {
  try {
    const response: AxiosResponse = await client.post(`/auth/logout`, config);

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to logout:", response.status);
      return false;
    }
  } catch (err) {
    onError(err);
    return false;
  }
}

// Like an article
export async function likeArticle(articleId: number): Promise<boolean | null> {
  try {
    const response: AxiosResponse = await client.post(
      `/likes`,
      {
        articleId,
      },
      config
    );

    // Check if the response status code is 200 (OK)
    if (response.status === 201) {
      return true;
    } else {
      console.error("Failed to like article:", response.status);
      return null;
    }
  } catch (err) {
    onError(err);
    return null;
  }
}

// Unlike an article
export async function unlikeArticle(
  articleId: number
): Promise<boolean | null> {
  try {
    const response: AxiosResponse = await client.delete(
      `/likes/article/${articleId}`,
      config
    );

    if (response.status === 204) {
      return true;
    } else {
      console.error("Failed to unlike article:", response.status);
      return null;
    }
  } catch (err) {
    onError(err);
    return null;
  }
}

// Send a comment
export async function sendComment(
  articleId: number,
  content: string
): Promise<TComment | null> {
  const data = {
    articleId,
    content,
  };

  try {
    const response: AxiosResponse = await client.post(
      `/comments`,
      data,
      config
    );

    // Check if the response status code is 201 (Created)
    if (response.status === 201) {
      return response.data;
    } else {
      console.error("Failed to send comment:", response.status);
      return null;
    }
  } catch (err) {
    onError(err);
    return null;
  }
}

// Fetch comments from the server of an article
export async function fetchComments(
  articleId: number,
  offset: number
): Promise<TComment[] | null> {
  // Add the article ID to the URL as a query parameter

  try {
    const response: AxiosResponse = await client.get(
      `/comments?articleId=${articleId}&offset=${offset}`,
      config
    );

    const data = response.data;

    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Failed to fetch comments:", response.status);
      return null;
    }
  } catch (err) {
    onError(err);
    return null;
  }
}

// Delete a comment
export async function deleteComment(id: number): Promise<boolean> {
  try {
    const response: AxiosResponse = await client.delete(
      `/comments/${id}`,
      config
    );

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to delete comment:", response.status);
      return false;
    }
  } catch (err) {
    onError(err);
    return false;
  }
}
