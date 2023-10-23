import Category from "@/Interfaces/Category.interface";
import MutationResponse from "@/Interfaces/MutationResponse.interface";
import ResolverContext from "@/Interfaces/ResolverContext.interface";
import prisma from "@/prisma";
import { protectedResolver } from "@/users/users.util";

const resolver = async (parent, args: Category, context: ResolverContext, info): Promise<MutationResponse> => {
  try {
    const { name, parentBoardId } = args;
    const { loggedInUser } = context;

    // loggedInUser가 board의 boardManager인지 확인
    await prisma.board.findUniqueOrThrow({
      where: {
        id: Number(parentBoardId),
        boardManagers: {
          some: {
            userId: loggedInUser.id,
          },
        },
      },
      select: {
        boardManagers: {
          select: {
            userId: true,
          },
        },
      },
    });

    await prisma.category.create({
      data: {
        name,
        parentBoardId: Number(parentBoardId),
      },
    });

    return {
      result: true,
    };
  } catch (error) {
    console.trace(error);

    return {
      result: false,
      error: "Failed to create category.",
    };
  }
};

export default {
  Mutation: {
    createCategory: protectedResolver(resolver),
  },
};
