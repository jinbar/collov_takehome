import { ApplicantCreateInput, ApplicantResponse } from "../types/applicant_types";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Applicant } from "../entities/Applicants";
import { GraphQLUpload } from "graphql-upload"
// import { Upload } from "../types/upload"
import { createWriteStream } from "fs"
import { Upload } from "src/types/upload";

@Resolver()
export class ApplicantResolver {
  @Query(() => [Applicant])
  async Applicants(): Promise<Applicant[]> {
    return Applicant.find();
  }

  @Mutation(() => Boolean)
  async AddResume(@Arg("resume", () => GraphQLUpload) {
    createReadStream,
    filename
  } : Upload): Promise<Boolean> {
    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(createWriteStream(`./src/resumes/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", (err : any) => {
          console.log(err)
          resolve(false)
        })     
    });
  }

  @Mutation(() => ApplicantResponse)
  async ApplicantCreate(
    @Arg("fields") fields: ApplicantCreateInput,
    )
  {
    let new_applicant = new Applicant();
    new_applicant.first_name = fields.first_name;
    new_applicant.last_name = fields.last_name;
    new_applicant.email = fields.email;
    new_applicant.phone = fields.phone;
    new_applicant.comments = fields.comments;

    try {
      let boi = await getConnection()
        .createQueryBuilder()
        .insert()
        .into("applicants")
        .values(new_applicant)
        .execute();
        new_applicant.applicant_id = boi.raw.insertId
    } catch (err) {
      return {
        error: err,
      };
    }
    return { applicant : new_applicant };
  }
}
