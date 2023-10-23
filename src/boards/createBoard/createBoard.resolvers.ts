import Board from "@/Interfaces/Board.interface";
import MutationResponse from "@/Interfaces/MutationResponse.interface";
import ResolverContext from "@/Interfaces/ResolverContext.interface";
import prisma from "@/prisma";
import { protectedResolver } from "@/users/users.util";
import { ManagerRole } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const resolver = async (parent, args: Board, context: ResolverContext, info): Promise<MutationResponse> => {
  let boardId: number = null;

  try {
    const { name, slug } = args;

    const { loggedInUser } = context;

    const board = await prisma.board.create({
      data: {
        name,
        slug,
      },
    });

    boardId = board.id;

    const category = prisma.category.create({
      data: {
        name: "General",
        slug: "General",
        parentBoardId: board.id,
      },
    });

    const boardManager = prisma.boardManager.create({
      data: {
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        managedBoard: {
          connect: {
            id: board.id,
          },
        },
        managerRole: ManagerRole.Owner,
      },
    });

    await prisma.$transaction([category, boardManager]);

    return {
      result: true,
    };
  } catch (error) {
    console.trace(error);

    const errorMap = new Map<string, string>([
      ["name", "Name already exists."],
      ["slug", "Slug already exists."],
    ]);

    if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
      if (error.meta && error.meta.target) {
        const target = error.meta.target[0] as string;

        return {
          result: false,
          error: errorMap.get(target),
        };
      }
    }

    if (boardId) {
      await prisma.board.delete({
        where: {
          id: boardId,
        },
      });
    }

    return {
      result: false,
      error: "Failed to create board.",
    };
  }
};

export default {
  Mutation: {
    createBoard: protectedResolver(resolver),
  },
};
