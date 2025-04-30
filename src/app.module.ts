import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./graphql/models/User";
import { UsersModule } from "./users/users.module";
import { Department } from "./graphql/models/Department";
import * as dotenv from "dotenv";
import { DepartmentModule } from "./department/department.module";
dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/schema.gql",
      context: ({ req }) => ({ req }),
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Department, User],
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
