"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const argon2 = __importStar(require("argon2"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Users_1 = require("../entities/Users");
const user_types_1 = require("../types/user_types");
let UsersResolver = class UsersResolver {
    Users() {
        return __awaiter(this, void 0, void 0, function* () {
            return Users_1.User.find();
        });
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.user_id) {
                return undefined;
            }
            const user = yield Users_1.User.findOne({
                where: { user_id: req.session.user_id },
            });
            return user;
        });
    }
    UserRegister(fields, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fields.username.length < 2 || fields.username.length > 32) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "Username has to be between 2 and 32 characters",
                        },
                    ],
                };
            }
            if (fields.password.length < 6 || fields.password.length > 64) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "Password has to between 6 and 64 characters",
                        },
                    ],
                };
            }
            let hashedPassword = yield argon2.hash(fields.password);
            let new_user = new Users_1.User();
            new_user.username = fields.username;
            new_user.password = hashedPassword;
            let user_id;
            try {
                let boi = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into("users")
                    .values(new_user)
                    .execute();
                user_id = boi.raw.insertId;
            }
            catch (err) {
                if (err.code.includes("ER_DUP_ENTRY")) {
                    if (err.sqlMessage.includes(fields.username)) {
                        return {
                            errors: [
                                {
                                    field: "username",
                                    message: "That username is taken",
                                },
                            ],
                        };
                    }
                }
                else if (err.code) {
                    return {
                        errors: [
                            {
                                field: "Server",
                                message: "Something went wrong",
                            },
                        ],
                    };
                }
            }
            req.session.user_id = user_id;
            console.log("p33p00p00");
            console.log(req.session.user_id);
            new_user.user_id = user_id;
            return { user: new_user };
        });
    }
    UserLogin(fields, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield Users_1.User.findOne({ where: { username: fields.username } });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "Username does not exist",
                        },
                    ],
                };
            }
            let validPassword = yield argon2.verify(user.password, fields.password);
            if (!validPassword) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "Password is incorrect",
                        },
                    ],
                };
            }
            req.session.user_id = user.user_id;
            return { user };
        });
    }
    UserLogout({ req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => req.session.destroy(err => {
                res.clearCookie("qid");
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Users_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "Users", null);
__decorate([
    type_graphql_1.Query(() => Users_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => user_types_1.UserResponse),
    __param(0, type_graphql_1.Arg("fields")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_types_1.UserRegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "UserRegister", null);
__decorate([
    type_graphql_1.Mutation(() => user_types_1.UserResponse),
    __param(0, type_graphql_1.Arg("fields")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_types_1.UserLoginInput, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "UserLogin", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "UserLogout", null);
UsersResolver = __decorate([
    type_graphql_1.Resolver()
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=User.js.map