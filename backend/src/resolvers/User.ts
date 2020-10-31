import * as argon2 from "argon2";
import { MyContext } from "src/types/context";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/Users";
import {
  UserLoginInput, UserRegisterInput,

  UserResponse
} from "../types/user_types";

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async Users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.user_id) {
      return undefined;
    }
    const user = await User.findOne({
      where: { user_id: req.session.user_id },
    });
    return user;
  }

  @Mutation(() => UserResponse)
  async UserRegister(
    @Arg("fields") fields: UserRegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (fields.username.length < 2 || fields.username.length > 32) {
      return {
        errors: [
          {
            field: "username",
            message: "Username has to be between 2 and 32 characters",
          },
        ],
      };
    }

    if (fields.password.length < 6 || fields.password.length > 64) {
      return {
        errors: [
          {
            field: "password",
            message: "Password has to between 6 and 64 characters",
          },
        ],
      };
    }

    let hashedPassword = await argon2.hash(fields.password);
    let new_user = new User();
    new_user.username = fields.username;
    new_user.password = hashedPassword;
    let user_id;
    try {
      let boi = await getConnection()
          .createQueryBuilder()
          .insert()
          .into("users")
          .values(new_user)
          .execute();
          user_id = boi.raw.insertId
    } catch (err) {
      if (err.code.includes("ER_DUP_ENTRY")) {
        if (err.sqlMessage.includes(fields.username)) {
          return {
            errors: [
              {
                field: "username",
                message: "That username is taken",
              },
            ],
          };
        }
      } else if (err.code) {
        return {
          errors: [
            {
              field: "Server",
              message: "Something went wrong",
            },
          ],
        };
      }
    }
    
    // just log them in once they register
    req.session.user_id = user_id;
    console.log("p33p00p00")
    console.log(req.session.user_id)
    new_user.user_id = user_id;
    return { user: new_user };
  }

  @Mutation(() => UserResponse)
  async UserLogin(
    @Arg("fields") fields: UserLoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    let user = await User.findOne({ where: { username: fields.username } });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Username does not exist",
          },
        ],
      };
    }
    let validPassword = await argon2.verify(user.password, fields.password);
    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Password is incorrect",
          },
        ],
      };
    }

    // user logged in properly so store their ID in the session
    req.session.user_id = user.user_id;
    return { user };
  }
  @Mutation(() => Boolean)
  async UserLogout(
    @Ctx() { req, res }: MyContext
  ): Promise<Boolean> {
    return new Promise(resolve => req.session.destroy(err => {
      res.clearCookie("qid")
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    }))
  }
}
