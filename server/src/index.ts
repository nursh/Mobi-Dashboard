import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";

import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from "./database";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 8080;

async function start(app: Application) {
  const db = await connectDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
      db,
      req,
      res,
    }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });
  app.listen(port, () => console.log(`[app]: running on port: ${port}${server.graphqlPath}`));
}

start(app);
