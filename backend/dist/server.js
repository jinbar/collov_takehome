"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const all_entities_1 = require("./entities/all_entities");
const all_resolvers_1 = require("./resolvers/all_resolvers");
const graphql_upload_1 = require("graphql-upload");
require("dotenv").config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "mysql",
        host: "database-1.c1au5ctrpceu.us-east-2.rds.amazonaws.com",
        username: "admin",
        password: "password",
        database: "collov1",
        port: 3306,
        logging: true,
        synchronize: false,
        entities: all_entities_1.all_entities,
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient({
        host: "127.0.0.1",
        port: 6379,
    });
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true
    }));
    app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    app.use(express_session_1.default({
        name: "qid",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        },
        saveUninitialized: false,
        secret: "secret",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: all_resolvers_1.all_resolvers,
            validate: false,
        }),
        context: ({ req, res }) => ({
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
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=server.js.map