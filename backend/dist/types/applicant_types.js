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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantResponse = exports.ApplicantCreateInput = void 0;
const Applicants_1 = require("../entities/Applicants");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let ApplicantCreateInput = class ApplicantCreateInput {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicantCreateInput.prototype, "first_name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicantCreateInput.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicantCreateInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicantCreateInput.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicantCreateInput.prototype, "comments", void 0);
ApplicantCreateInput = __decorate([
    type_graphql_1.InputType()
], ApplicantCreateInput);
exports.ApplicantCreateInput = ApplicantCreateInput;
let ApplicantResponse = class ApplicantResponse {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ApplicantResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => Applicants_1.Applicant, { nullable: true }),
    __metadata("design:type", Applicants_1.Applicant)
], ApplicantResponse.prototype, "applicant", void 0);
ApplicantResponse = __decorate([
    type_graphql_1.ObjectType()
], ApplicantResponse);
exports.ApplicantResponse = ApplicantResponse;
//# sourceMappingURL=applicant_types.js.map