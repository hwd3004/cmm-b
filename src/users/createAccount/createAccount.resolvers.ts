import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import MutationResponse from "@/Interfaces/MutationResponse.interface";
import User from "@/Interfaces/User.interface";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import emailValidator from "email-validator";

/**
 * 패스워드 유효성 검사. 6자 이상 30자 이하, 영문자 3자 이상, 특수문자 허용
 * @param {string} password
 * @returns {boolean}
 */
const isPasswordValid = (password: string): boolean => {
  // Ensure the password is between 6 and 30 characters.
  if (password.length < 6 || password.length > 30) {
    return false;
  }

  // Check for at least 3 English characters.
  if (password.replace(/[^a-zA-Z]/g, "").length < 3) {
    return false;
  }

  // Check if the password is not all numeric.
  if (/^\d+$/.test(password)) {
    return false;
  }

  // Allow special characters
  if (!/^(?=.*[a-zA-Z])[\w\d!@#$%^&*()-_=+[\]{}|;:'",.<>/?\\]+$/i.test(password)) {
    return false;
  }

  return true;
};

export default {
  Mutation: {
    // 유저 데이터 생성, 이메일은 필수가 아님!
    createAccount: async (parent, args: User, context, info): Promise<MutationResponse> => {
      try {
        const { username, password, confirmPassword, email } = args;

        if (!username || !password) {
          return {
            result: false,
            error: "Missing required fields.",
          };
        }

        // 정규표현식으로 username에 공백, 특수문자가 있는지 검사. 3자 이상 20자 이하.
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernameRegex.test(username)) {
          return {
            result: false,
            error: "username must be 3-20 characters and can contain letters and numbers only.",
          };
        }

        // email에 값이 있다면 email이 정규표현식에 맞는지 검사.
        if (email) {
          if (!emailValidator.validate(email)) {
            return {
              result: false,
              error: "Invalid email address.",
            };
          }
        }

        if (password != confirmPassword) {
          return {
            result: false,
            error: "Passwords do not match.",
          };
        }

        if (!isPasswordValid(password)) {
          return {
            result: false,
            error:
              "Passwords must be between 6 and 30 characters long, contain at least three alphanumeric characters, and can contain special characters.",
          };
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
          data: {
            username,
            password: hashPassword,
            email,
          },
        });

        return {
          result: true,
        };
      } catch (error) {
        const errorMap = new Map<string, string>([
          ["username", "Username already exists."],
          ["email", "Email already exists."],
        ]);

        if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
          if (error.meta && error.meta.target) {
            const target = error.meta.target[0] as string;

            return {
              result: false,
              error: errorMap.get(target),
            };
          }
        }

        return {
          result: false,
          error: "Failed to create account.",
        };
      }
    },
  },
};
