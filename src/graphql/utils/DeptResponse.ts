import { ObjectType, Field } from "@nestjs/graphql";
import { Department } from "../models/Department";

@ObjectType()
export class DepartmentsResponse {
  @Field(() => [Department])
  departments: Department[];

  @Field()
  totalCount: number;
}
