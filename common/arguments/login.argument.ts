import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class LoginArgument {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  clientIdentifier: string;
}
