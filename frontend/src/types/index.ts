export type ArticleType = {
  id: number;
  title: string;
  content: string;
  created: Date;
  user: UserType;
};

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  created: string;
};
