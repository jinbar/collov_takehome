import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import { Upload } from "../types/upload";

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(@Arg("picture", () => GraphQLUpload)
  {
    createReadStream,
    filename
  }: Upload): Promise<boolean> {

    await new Promise(async () =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../resumes/${filename}`))
        .on("finish", () => {
          console.log("y7eet")
          return true
        })
        .on("error", () => {
          console.log("sadge")
          return false;
        })
    );
      return true;
  }
}
