import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@ObjectType()
@Entity("applicants")
export class Applicant extends BaseEntity {
  @Field()
  @PrimaryColumn()
  applicant_id!: Number;

  @Field()
  @Column({type: "varchar", length: 45 })
  first_name!: string;

  @Field()
  @Column({type: "varchar", length: 45 })
  last_name!: string;

  @Field()
  @Column({type: "varchar", length: 45 })
  email!: string;

  @Field()
  @Column({type: "varchar", length: 45 })
  phone!: string;
  
  @Field()
  @Column({type: "varchar", length: 300 })
  comments!: string;
  
  @Field()
  @Column({type: "varchar", length: 100 })
  resume!: string;
}
