import Category from "@/Interfaces/Category.interface";
import MutationResponse from "@/Interfaces/MutationResponse.interface";
import ResolverContext from "@/Interfaces/ResolverContext.interface";
import prisma from "@/prisma";
import { protectedResolver } from "@/users/users.util";

const resolver = async (parent, args: Category, context: ResolverContext, info): Promise<MutationResponse> => {
  try {
    const { name, slug, parentBoardId } = args;
    const { loggedInUser } = context;

    // 사용자가 board의 board manager인지 확인

    return {
      result: true,
    };
  } catch (error) {
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
