import Comment from "@/Interfaces/Comment.interface";
import MutationResponse from "@/Interfaces/MutationResponse.interface";
import ResolverContext from "@/Interfaces/ResolverContext.interface";
import prisma from "@/prisma";
import { protectedResolver } from "@/users/users.util";

const resolver = async (parent, args: Comment, context: ResolverContext, info): Promise<MutationResponse> => {
  try {
    const { content, parentPostId, parentCommentId } = args;
    const { loggedInUser } = context;

    await prisma.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: loggedInUser.id,
          },
        },
        parentPost: {
          connect: {
            id: Number(parentPostId),
          },
        },
        parentCommentId,
      },
    });

    return {
      result: true,
    };
  } catch (error) {
    console.trace(error);

    return {
      result: false,
      error: "Failed to create board.",
    };
  }
};

export default {
  Mutation: {
    createComment: protectedResolver(resolver),
  },
};
