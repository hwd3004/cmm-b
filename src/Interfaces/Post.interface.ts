import Board from "./Board.interface";
import Category from "./Category.interface";
import User from "./User.interface";

interface Post {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  author: User;
  authorId: number;

  parentBoard: Board;
  parentBoardId: number;

  comments: [Comment];

  category: Category;
  categoryId: number;
}

export default Post;
