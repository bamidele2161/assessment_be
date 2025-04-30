import { InputType, Field, Int } from "@nestjs/graphql";
import {
  IsNotEmpty,
  MinLength,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class SubDepartmentInput {
  @Field()
  @IsNotEmpty({ message: "Sub-department name is required" })
  @MinLength(2, {
    message: "Sub-department name must be at least 2 characters long",
  })
  name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsNotEmpty({ message: "Department name is required" })
  @MinLength(2, {
    message: "Department name must be at least 2 characters long",
  })
  name: string;

  @Field(() => [SubDepartmentInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SubDepartmentInput)
  subDepartments?: SubDepartmentInput[];
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}
