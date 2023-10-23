import prisma from "@/prisma";

const resolver = async (parent, args, context, info) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        categories: true,
        posts: true,
        boardManagers: true,
      },
    });

    return boards;
  } catch (error) {
    console.trace(error);

    return null;
  }
};

export default {
  Query: {
    getBoards: resolver,
  },
};
