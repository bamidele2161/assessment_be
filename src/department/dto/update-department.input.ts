import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  // @Field(() => ID)
  // @IsNotEmpty({ message: 'Department ID is required' })
  // id: number;

  @Field()
  @IsNotEmpty({ message: 'Department name is required' })
  @MinLength(2, {
    message: 'Department name must be at least 2 characters long',
  })
  name: string;
}
