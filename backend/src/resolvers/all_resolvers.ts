import { BuildSchemaOptions } from "type-graphql";
import { ApplicantResolver } from "./ApplicantResolver";
import { UsersResolver } from "./User";

export const all_resolvers: BuildSchemaOptions["resolvers"] = [
  ApplicantResolver, UsersResolver
];
