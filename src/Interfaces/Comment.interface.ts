import Category from "./Category.interface";
import Post from "./Post.interface";
import User from "./User.interface";

interface Comment {
  id: number;
  content: string;

  createdAt: string;
  updatedAt: string;

  author: User;
  authorId: number;

  parentPost: Post;
  parentPostId: number;

  parentCommentId: number;
}

export default Comment;
