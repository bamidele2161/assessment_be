import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from "@nestjs/graphql";
import { User } from "../graphql/models/User";

import { UserInput } from "../graphql/utils/CreateUserInput";
import { UserService } from "./UserService";
import { LoginResponse } from "src/graphql/utils/UserResponse";

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => User)
  createUser(@Args("createUserData") createUserData: UserInput) {
    return this.userService.createUser(createUserData);
  }

  @Mutation((returns) => LoginResponse)
  login(@Args("loginUserData") loginUserData: UserInput) {
    return this.userService.login(loginUserData);
  }
}
