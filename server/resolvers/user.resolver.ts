import { Authorized, Query, Resolver } from 'type-graphql';
import { Permissions } from '../../common/enums/Permissions.enum';
import { UserObject } from '../../common/objects/User.object';
import { UserService } from '../services/User.service';

@Resolver(of => UserObject)
export class UserResolver {
  constructor (
    private readonly userService: UserService
  ) { }

  @Query(returns => [UserObject])
  @Authorized(Permissions.admin)
  async getUsers(): Promise<UserObject[]> {
    const users = await this.userService.getAllUsers();

    return users.map(user => {
      const userObject = new UserObject();

      userObject.username = user.email;
      userObject.permissions = user.allPermissions;

      return userObject;
    });
  }
}
