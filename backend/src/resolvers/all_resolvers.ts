import { BuildSchemaOptions } from "type-graphql";
import { ApplicantResolver } from "./ApplicantResolver";
import { ProfilePictureResolver } from "./plswork"

export const all_resolvers: BuildSchemaOptions["resolvers"] = [
  ApplicantResolver, ProfilePictureResolver
];
