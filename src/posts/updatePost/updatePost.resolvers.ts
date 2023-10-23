import MutationResponse from "@/Interfaces/MutationResponse.interface";
import prisma from "@/prisma";
import { protectedResolver } from "@/users/users.util";
import ResolverContext from "@/Interfaces/ResolverContext.interface";
import Post from "@/Interfaces/Post.interface";

const resolver = async (parent, args: Post, context: ResolverContext, info): Promise<MutationResponse> => {
  try {
    const { id, title, content, categoryId } = args;
    const { loggedInUser } = context;

    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (post.authorId !== loggedInUser.id) {
      return {
        result: false,
        error: "Not authorized.",
      };
    }

    await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        category: {
          connect: {
            id: Number(categoryId),
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
    updatePost: protectedResolver(resolver),
  },
};
