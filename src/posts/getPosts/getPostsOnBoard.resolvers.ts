import Post from "@/Interfaces/Post.interface";
import prisma from "@/prisma";

const resolver = async (parent, args: Post, context, info) => {
  try {
    const { parentBoardId } = args;
    const posts = await prisma.post.findMany({
      where: {
        parentBoardId: Number(parentBoardId),
        isDeleted: false,
      },
    });

    return posts;
  } catch (error) {
    console.trace(error);

    return null;
  }
};

export default {
  Query: {
    getPostsOnBoard: resolver,
  },
};
