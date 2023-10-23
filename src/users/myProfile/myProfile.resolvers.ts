import ResolverContext from "@/Interfaces/ResolverContext.interface";
import User from "@/Interfaces/User.interface";
import { protectedResolver } from "@/users/users.util";

const resolver = async (parent, args, context: ResolverContext, info): Promise<User> => {
  try {
    const { loggedInUser } = context;

    return {
      ...loggedInUser,
    };
  } catch (error) {
    return null;
  }
};

export default {
  Query: {
    myProfile: protectedResolver(resolver),
  },
};
