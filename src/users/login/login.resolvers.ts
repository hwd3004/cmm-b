import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import MutationResponse from "@/Interfaces/MutationResponse.interface";
import User from "@/Interfaces/User.interface";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Query: {
    login: async (parent, args: User, context, info): Promise<MutationResponse> => {
      try {
        const { username, password } = args;

        const user = await prisma.user.findUniqueOrThrow({
          where: {
            username,
          },
        });

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
          return {
            result: false,
            error: "Wrong password.",
          };
        }

        const token = jwt.sign({ id: user.id }, String(process.env.SECRET_KEY));

        return {
          result: true,
          token,
        };
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code == "P2025") {
            return {
              result: false,
              error: "User not found.",
            };
          }
        }

        return {
          result: false,
          error: "Unknown error.",
        };
      }
    },
  },
};
