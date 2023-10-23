import ResolverContext from "@/Interfaces/ResolverContext.interface";
import prisma from "@/prisma";
import jwt from "jsonwebtoken";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }

    const data = jwt.verify(token, String(process.env.SECRET_KEY));

    const { id } = data as { id: number };

    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const protectedResolver = (resolver: Function) => {
  return (root, args, context: ResolverContext, info) => {
    if (!context.loggedInUser) {
      return {
        result: false,
        error: "please log in.",
      };
    }

    return resolver(root, args, context, info);
  };
};
