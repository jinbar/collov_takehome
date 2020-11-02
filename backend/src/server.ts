import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import Express from "express";
import session from "express-session";
import redis from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { all_entities } from "./entities/all_entities";
import { all_resolvers } from "./resolvers/all_resolvers";
import { MyContext } from "./types/context";
import { graphqlUploadExpress} from "graphql-upload"
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
    entities: all_entities,
  })
  const app = Express()
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
  });
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true, // can't access cookie from browser
        secure: true, // use https in prod
        sameSite: "lax", // csrf
      },
      saveUninitialized: false,
      secret: "secret",
      resave: false,
    })
  );
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
    uploads: false,
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
