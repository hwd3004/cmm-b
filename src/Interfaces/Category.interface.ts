import Board from "./Board.interface";
import Post from "./Post.interface";

interface Category {
  id: number;
  name: string;
  slug: string;

  createdAt: string;
  updatedAt: string;

  parentBoard: Board;
  parentBoardId: number;

  posts: [Post];
}

export default Category;
