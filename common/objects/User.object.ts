import { Field, ObjectType } from "type-graphql";
import { Permissions } from "../enums/Permissions.enum";

@ObjectType()
export class UserObject {
  @Field()
  username: string;

  @Field(type => [String])
  permissions: Permissions[];
}
