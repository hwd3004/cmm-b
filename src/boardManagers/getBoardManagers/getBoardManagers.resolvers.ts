import prisma from "@/prisma";

const resolver = async (parent, args, context, info) => {
  try {
    const boardManagers = await prisma.boardManager.findMany({
      include: {
        managedBoard: true,
        user: true,
      },
    });

    return boardManagers;
  } catch (error) {
    console.trace(error);

    return null;
  }
};

export default {
  Query: {
    getBoardManagers: resolver,
  },
};
