import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class LogoutArgument {
  @Field()
  clientIdentifier: string;
}