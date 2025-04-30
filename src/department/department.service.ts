import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDepartmentInput } from "./dto/create-department.input";
import { UpdateDepartmentInput } from "./dto/update-department.input";
import { Department } from "src/graphql/models/Department";
import { DepartmentsResponse } from "src/graphql/utils/DeptResponse";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>
  ) {}

  async create(
    createDepartmentInput: CreateDepartmentInput
  ): Promise<Department> {
    const department = this.departmentRepository.create({
      name: createDepartmentInput.name,
    });

    await this.departmentRepository.save(department);

    if (
      Array.isArray(createDepartmentInput.subDepartments) &&
      createDepartmentInput.subDepartments.length > 0
    ) {
      const subDepartments = createDepartmentInput.subDepartments.map(
        (subDept) =>
          this.departmentRepository.create({
            name: subDept.name,
            parent: department,
          })
      );

      await this.departmentRepository.save(subDepartments);
    }

    return this.departmentRepository.findOne({
      where: { id: department.id },
      relations: ["subDepartments"],
    });
  }

  async findAll(page: number, limit: number): Promise<DepartmentsResponse> {
    const [departments, totalCount] =
      await this.departmentRepository.findAndCount({
        where: { parentId: null },
        relations: ["subDepartments"],
        skip: (page - 1) * limit,
        take: limit,
      });

    return {
      departments,
      totalCount,
    };
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ["subDepartments"],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async update(
    id: number,
    updateDepartmentInput: UpdateDepartmentInput
  ): Promise<Department> {
    console.log(id);

    const department = await this.findOne(id);

    if (!department) {
      throw new Error("Department not found");
    }

    department.name = updateDepartmentInput.name;

    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const department = await this.findOne(id);
    if (!department) {
      throw new Error("Department not found");
    }
    await this.departmentRepository.remove(department);
    return true;
  }
}
