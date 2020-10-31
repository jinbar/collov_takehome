import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../entities/Users";

@InputType()
export class UserRegisterInput {
  @Field()
  username!: string;

  @Field()
  password!: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  username!: string;

  @Field()
  password!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
