import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ArticleType, UserType } from "src/types";

const serverUrl = import.meta.env.VITE_SERVER_URL;

console.log("Server URL:", serverUrl);

const client = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
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

// Create a new article
export async function createArticle(
  article: Partial<ArticleType>
): Promise<ArticleType | null> {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = article;

  try {
    const response: AxiosResponse<ArticleType> = await client.post(
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
    // Handle errors from Axios
    if (axios.isAxiosError(err)) {
      console.error("Axios error.", "Code:", err.code, "Message:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    return null;
  }
}

// Login to the server
export async function login(
  username: string,
  password: string
): Promise<boolean> {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

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
    // Handle errors from Axios
    if (axios.isAxiosError(err)) {
      console.error("Axios error.", "Code:", err.code, "Message:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    return false;
  }
}

// Get the profile of the logged-in user
export async function getProfile(): Promise<any | null> {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    },
  };

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
    // Handle errors from Axios
    if (axios.isAxiosError(err)) {
      console.error("Axios error.", "Code:", err.code, "Message:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    return null;
  }
}

// Check if the user is authenticated
export async function isAuth(): Promise<UserType | null> {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    },
  };

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
    // Handle errors from Axios
    if (axios.isAxiosError(err)) {
      console.error("Axios error.", "Code:", err.code, "Message:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    return null;
  }
}

// Delete an article
export async function deleteArticle(id: number): Promise<boolean> {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    },
  };

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
    // Handle errors from Axios
    if (axios.isAxiosError(err)) {
      console.error("Axios error.", "Code:", err.code, "Message:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    return false;
  }
}
