import Category from "./Category.interface";
import Post from "./Post.interface";

interface Board {
  id: number;
  name: string;
  slug: string;

  createdAt: string;
  updatedAt: string;

  categories: [Category];

  posts: [Post];
}

export default Board;
