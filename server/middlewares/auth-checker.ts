import { AuthChecker } from "type-graphql";
import { Permissions } from "../../common/enums/Permissions.enum";
import { Context } from "./context.type";

export const authChecker: AuthChecker<Context, Permissions> = (
  { context },
  roles: Permissions[],
) => {
  if (!context.user) {
    return false;
  }
  return context.user.allPermissions.some(permission => roles.includes(permission)); // or false if access is denied
};
