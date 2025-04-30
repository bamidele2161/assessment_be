import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../graphql/models/User";
import { UserInput } from "../graphql/utils/CreateUserInput";
import * as bcrypt from "bcrypt";
// import { LoginResponse } from 'src/graphql/utils/UserResponse';
import { JwtService } from "@nestjs/jwt";
import { LoginResponse } from "src/graphql/utils/UserResponse";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  // getUsers() {
  //   return this.usersRepository.find({ relations: ['settings'] });
  // }

  async findByUsername(username: string): Promise<User | undefined> {
    const trimmedUsername = username.trim();
    const user = await this.usersRepository.findOne({
      where: { username: trimmedUsername },
    });
    console.log(user, "koyemiii");
    return user;
  }

  async createUser(createUserData: UserInput) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserData.password,
      saltRounds
    );

    const newUser = this.usersRepository.create({
      ...createUserData,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);
    console.log(user, "what is happening");
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log(result, "yatiiii");
      return result;
    }

    return null;
  }
  async findById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { id } });
  }
  async login(loginInput: UserInput): Promise<LoginResponse> {
    console.log(loginInput);
    const user = await this.validateUser(
      loginInput.username,
      loginInput.password
    );
    console.log(user);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { username: user.username, sub: user.id };
    console.log(user);
    return {
      message: "Login successfully",
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
