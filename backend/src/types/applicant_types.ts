import { Applicant } from "../entities/Applicants";
import { InputType, Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@InputType()
export class ApplicantCreateInput {
  @Field()
  @Column()
  first_name!: string;

  @Field()
  @Column()
  last_name!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  phone!: string;
  
  @Field()
  @Column()
  comments!: string;
}

@ObjectType()
export class ApplicantResponse {
  @Field(() => String, { nullable: true })
  error?: String;

  @Field(() => Applicant, { nullable: true })
  applicant?: Applicant;
}
