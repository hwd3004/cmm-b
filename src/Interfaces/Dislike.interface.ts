import Post from "./Post.interface";
import User from "./User.interface";

interface Dislike {
  id: number;

  createdAt: string;
  updatedAt: string;

  parentPost: Post;
  parentPostId: number;

  dislikedUser: User;
  dislikedUserId: number;
}

export default Dislike;
