import { ApplicantCreateInput, ApplicantResponse } from "../types/applicant_types";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Applicant } from "../entities/Applicants";
// import { GraphQLUpload } from "graphql-upload"
// import { Upload } from "../types/upload"
// import { createWriteStream } from "fs"

@Resolver()
export class ApplicantResolver {
  @Query(() => [Applicant])
  async Applicants(): Promise<Applicant[]> {
    return Applicant.find();
  }

  @Mutation(() => ApplicantResponse)
  async ApplicantCreate(
    @Arg("fields") fields: ApplicantCreateInput,
    // @Arg("picture", () => GraphQLUpload) { createReadStream, filename }: Upload
    )
  {
    let new_applicant = new Applicant();
    new_applicant.first_name = fields.first_name;
    new_applicant.last_name = fields.last_name;
    new_applicant.email = fields.email;
    new_applicant.phone = fields.phone;
    new_applicant.comments = fields.comments;

    // await new Promise(async (resolve, reject) => {
    //   createReadStream()
    //     .pipe(createWriteStream(__dirname + `../resumes/${filename}`))
    //     .on("finish", () => resolve(true))
    //     .on("error", () => reject(false))
      
    //   new_applicant.resume = __dirname + `../resumes/${filename}`;
    // })


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
