import MutationResponse from "@/Interfaces/MutationResponse.interface";
import prisma from "@/prisma";
import { protectedResolver } from "@/users/users.util";
import ResolverContext from "@/Interfaces/ResolverContext.interface";
import Post from "@/Interfaces/Post.interface";

const resolver = async (parent, args: Post, context: ResolverContext, info): Promise<MutationResponse> => {
  try {
    const { title, content, categoryId, parentBoardId } = args;
    const { loggedInUser } = context;

    await prisma.post.create({
      data: {
        title,
        content,
        category: {
          connect: {
            id: Number(categoryId),
          },
        },
        author: {
          connect: {
            id: loggedInUser.id,
          },
        },
        parentBoard: {
          connect: {
            id: Number(parentBoardId),
          },
        },
      },
    });

    return {
      result: true,
    };
  } catch (error) {
    console.trace(error);

    return {
      result: false,
      error: "Failed to create post.",
    };
  }
};

export default {
  Mutation: {
    createPost: protectedResolver(resolver),
  },
};
