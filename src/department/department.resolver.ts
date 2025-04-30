import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import {
  CreateDepartmentInput,
  PaginationInput,
} from "./dto/create-department.input";
import { UpdateDepartmentInput } from "./dto/update-department.input";
import { Department } from "src/graphql/models/Department";
import { DepartmentsResponse } from "src/graphql/utils/DeptResponse";
import { GqlAuthGuard } from "src/users/strategies/auth/gql-auth.guard";

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard)
  createDepartment(
    @Args("input") createDepartmentInput: CreateDepartmentInput
  ): Promise<Department> {
    return this.departmentService.create(createDepartmentInput);
  }

  @Query(() => DepartmentsResponse)
  async getDepartments(
    @Args("pagination") pagination: PaginationInput
  ): Promise<DepartmentsResponse> {
    return this.departmentService.findAll(pagination.page, pagination.limit);
  }

  @Query(() => Department, { name: "department" })
  async findOne(
    @Args("id", { type: () => ID }) id: number
  ): Promise<Department> {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard)
  async updateDepartment(
    @Args("id", { type: () => ID }) id: number,
    @Args("input") updateDepartmentInput: UpdateDepartmentInput
  ): Promise<Department> {
    return this.departmentService.update(id, updateDepartmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteDepartment(
    @Args("id", { type: () => ID }) id: number
  ): Promise<boolean> {
    return this.departmentService.remove(id);
  }
}
