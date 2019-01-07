import { Field, ObjectType } from "type-graphql";

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
}
