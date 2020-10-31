import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Applicant } from "./entities/Applicants";
import { all_resolvers } from "./resolvers/all_resolvers";
import { MyContext } from "./types/context";
import cors from "cors"
require("dotenv").config();

const main = async () => {
  await createConnection({
    type: "mysql",
    host: "database-1.c1au5ctrpceu.us-east-2.rds.amazonaws.com",
    username: "admin",
    password: "password",
    database: "collov1",
    port: 3306,
    logging: true,
    synchronize: false,
    entities:[Applicant]
  })
  const app = express()
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: all_resolvers,
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({
      req,
      res,
    }),
    debug: true,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  
  app.listen(5001, () => {
    console.log(`Server has started at port: ` + 5001);
  });
}

main().catch((err) => {
  console.log(err);
});
