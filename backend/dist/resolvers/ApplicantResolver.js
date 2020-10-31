"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ApplicantResolver = void 0;
const applicant_types_1 = require("../types/applicant_types");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Applicants_1 = require("../entities/Applicants");
let ApplicantResolver = class ApplicantResolver {
    Applicants() {
        return __awaiter(this, void 0, void 0, function* () {
            return Applicants_1.Applicant.find();
        });
    }
    AuthorCreate(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            let new_applicant = new Applicants_1.Applicant();
            new_applicant.first_name = fields.first_name;
            new_applicant.last_name = fields.last_name;
            new_applicant.Email = fields.email;
            new_applicant.phone = fields.phone;
            new_applicant.comments = fields.comments;
            try {
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into("applicants")
                    .values(new_applicant)
                    .execute();
            }
            catch (err) {
                return {
                    error: err,
                };
            }
            return { applicant: new_applicant };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Applicants_1.Applicant]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicantResolver.prototype, "Applicants", null);
__decorate([
    type_graphql_1.Mutation(() => applicant_types_1.ApplicantResponse),
    __param(0, type_graphql_1.Arg("fields")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [applicant_types_1.ApplicantCreateInput]),
    __metadata("design:returntype", Promise)
], ApplicantResolver.prototype, "AuthorCreate", null);
ApplicantResolver = __decorate([
    type_graphql_1.Resolver()
], ApplicantResolver);
exports.ApplicantResolver = ApplicantResolver;
//# sourceMappingURL=ApplicantResolver.js.map