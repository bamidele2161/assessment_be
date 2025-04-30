import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: "departments" })
export class Department {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Department, { nullable: true })
  @ManyToOne(() => Department, (department) => department.subDepartments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parentId" })
  parent: Department;

  @Column({ nullable: true })
  parentId: number;

  @Field(() => [Department], { nullable: true })
  @OneToMany(() => Department, (department) => department.parent, {
    cascade: true,
  })
  subDepartments: Department[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
