import Like from "@/Interfaces/Like.interface";
import MutationResponse from "@/Interfaces/MutationResponse.interface";
import ResolverContext from "@/Interfaces/ResolverContext.interface";
import prisma from "@/prisma";
import { protectedResolver } from "@/users/users.util";

const resolver = async (parent, args: Like, context: ResolverContext, info): Promise<MutationResponse> => {
  try {
    const { parentPostId } = args;
    const { loggedInUser } = context;

    await prisma.like.create({
      data: {
        likedUser: {
          connect: {
            id: loggedInUser.id,
          },
        },
        parentPost: {
          connect: {
            id: parentPostId,
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
      error: "Failed to like post.",
    };
  }
};

export default {
  Mutation: {
    likePost: protectedResolver(resolver),
  },
};
