import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class RefreshArgument {
  @Field()
  clientIdentifier: string;

  @Field()
  refreshToken: string;
}
