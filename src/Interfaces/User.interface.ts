import BoardManager from "./BoardManager.interface";
import Post from "./Post.interface";

enum Role {
  ADMIN,
  USER,
}

interface User {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;

  createdAt: string;
  updatedAt: string;

  role: Role;

  writtenPosts: [Post];
  writtenComments: [Comment];

  managedBoards: [BoardManager];
}

export default User;
