export type TArticle = {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: TUser;
  isLikedByUser: boolean;
  totalLikes: number;
  totalComments: number;
  created: Date;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  created: string;
};

export type TComment = {
  id: number;
  userId: number;
  articleId: number;
  user: TUser;
  content: string;
  created: string;
};

export type TFetchArticles = {
  status: string;
  totalResults: number;
  articles: TArticle[];
};
