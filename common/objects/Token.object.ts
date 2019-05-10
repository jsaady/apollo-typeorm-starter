import { Field, ObjectType } from "type-graphql";
import { UserObject } from "./User.object";

@ObjectType()
export class TokenObject {
  @Field()
  authToken: string;

  @Field(() => Date)
  authTokenExpiration: Date;

  @Field()
  refreshToken: string;

  @Field(() => Date)
  refreshTokenExpiration: Date;

  @Field(() => UserObject)
  user: UserObject;
}
