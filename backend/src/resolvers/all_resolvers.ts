import { BuildSchemaOptions } from "type-graphql";
import { ApplicantResolver } from "./ApplicantResolver";

export const all_resolvers: BuildSchemaOptions["resolvers"] = [
  ApplicantResolver,
];
