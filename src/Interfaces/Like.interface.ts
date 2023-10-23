import Post from "./Post.interface";
import User from "./User.interface";

interface Like {
  id: number;

  createdAt: string;
  updatedAt: string;

  parentPost: Post;
  parentPostId: number;

  likedUser: User;
  likedUserId: number;
}

export default Like;
