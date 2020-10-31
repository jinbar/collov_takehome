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
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true, type: "varchar", length: 64 }),
    __metadata("design:type", String)
], User.prototype, "Username", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true, type: "varchar", length: 100 }),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "Created_At", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "Updated_At", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("Users")
], User);
exports.User = User;
//# sourceMappingURL=User.js.map