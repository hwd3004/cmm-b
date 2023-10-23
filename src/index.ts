import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import schema from "@/schema";
import { getUser } from "./users/users.util";

const startServer = async () => {
  try {
    const NODE_ENV = process.env.NODE_ENV || "dev";

    const port = 4000;

    const app = express();

    const httpServer = http.createServer(app);

    app.use(compression());
    app.use(morgan("dev"));
    app.use(bodyParser.json());

    app.use(cors());

    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
      expressMiddleware(server, {
        context: async (args) => {
          const { req } = args;

          return {
            loggedInUser: await getUser(req.headers.token as string),
          };
        },
      })
    );

    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  } catch (error) {
    console.trace(error);
  }
};

startServer();
