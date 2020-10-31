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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Applicants_1 = require("./entities/Applicants");
const all_resolvers_1 = require("./resolvers/all_resolvers");
const cors_1 = __importDefault(require("cors"));
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
        entities: [Applicants_1.Applicant]
    });
    const app = express_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true
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