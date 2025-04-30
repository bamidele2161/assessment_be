import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentService } from "./department.service";
import { DepartmentResolver } from "./department.resolver";
import { Department } from "src/graphql/models/Department";

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentService, DepartmentResolver],
})
export class DepartmentModule {}
