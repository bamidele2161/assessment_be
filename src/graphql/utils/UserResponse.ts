import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../models/User";

@ObjectType()
export class LoginResponse {
  @Field()
  message: string;
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}
