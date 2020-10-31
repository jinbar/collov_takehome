import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  user_id!: Number;

  @Field()
  @Column()
  username!: string;

  @Column()
  password!: string;
}
