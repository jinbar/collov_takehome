import { ApplicantCreateInput, ApplicantResponse } from "../types/applicant_types";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Applicant } from "../entities/Applicants";

@Resolver()
export class ApplicantResolver {
  @Query(() => [Applicant])
  async Applicants(): Promise<Applicant[]> {
    return Applicant.find();
  }

  @Mutation(() => ApplicantResponse)
  async AuthorCreate(
    @Arg("fields") fields: ApplicantCreateInput
  ) {
    let new_applicant = new Applicant();
    new_applicant.first_name = fields.first_name;
    new_applicant.last_name = fields.last_name;
    new_applicant.Email = fields.email;
    new_applicant.phone = fields.phone;
    new_applicant.comments = fields.comments;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into("applicants")
        .values(new_applicant)
        .execute();
    } catch (err) {
      return {
        error: err,
      };
    }
    return { applicant : new_applicant };
  }
}
