import Board from "./Board.interface";
import User from "./User.interface";

enum ManagerRole {
  Owner,
  Moderator,
}

interface BoardManager {
  id: number;

  createdAt: string;
  updatedAt: string;

  managerRole: ManagerRole;

  managedBoard: Board;
  managedBoardId: number;

  user: User;
  userId: number;
}

export default BoardManager;
