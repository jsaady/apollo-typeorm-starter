import { Args, Ctx, Mutation, Resolver } from "type-graphql";
import { LoginArgument } from "../../common/arguments/login.argument";
import { LogoutArgument } from "../../common/arguments/logout.argument";
import { RefreshArgument } from "../../common/arguments/refresh.argument";
import { LoginErrors } from "../../common/enums/LoginErrors.enum";
import { RefreshTokenErrors } from "../../common/enums/RefreshTokenErrors.enum";
import { SignupErrors } from "../../common/enums/SignupErrors.enum";
import { TokenObject } from "../../common/objects/Token.object";
import { User } from "../entities/User.entity";
import { AuthTokenService } from "../services/AuthToken.service";
import { RefreshTokenService } from "../services/RefreshToken.service";

@Resolver(of => TokenObject)
export class AuthResolver {
  constructor (
    private readonly authTokenService: AuthTokenService,
    private readonly refreshTokenService: RefreshTokenService
  ) { }

  @Mutation(returns => TokenObject)
  async signup (
    @Args() signupInfo: LoginArgument
  ) {
    const result = await this.authTokenService.createUser(
      signupInfo.username,
      signupInfo.password,
      signupInfo.clientIdentifier
    );

    switch (result) {
      case SignupErrors.USER_EXISTS:
        throw new Error('Email exists');
      default:
        return result;
    }
  }

  @Mutation(returns => TokenObject)
  async login (
    @Args() loginInfo: LoginArgument
  ) {
    const result = await this.authTokenService.issue(
      loginInfo.username,
      loginInfo.password,
      loginInfo.clientIdentifier
    );

    switch (result) {
      case LoginErrors.INVALID_PASSWORD:
      case LoginErrors.USER_NOT_FOUND:
        throw new Error('Invalid username or password');
      default:
        return result;
    }
  }

  @Mutation(returns => TokenObject)
  async refresh (
    @Args() refreshInfo: RefreshArgument
  ) { 
    const result = await this.authTokenService.refresh(
      refreshInfo.refreshToken,
      refreshInfo.clientIdentifier
    );

    switch (result) {
      case RefreshTokenErrors.TOKEN_MISMATCH:
        throw new Error('Invalid refreshToken or clientIdentifier');
      default:
        return result;
    }
  }
  @Mutation(returns => String)
  async logout (
    @Args() logoutInfo: LogoutArgument,
    @Ctx('user') user: User
  ) {
    await this.refreshTokenService.revoke(user.id, logoutInfo.clientIdentifier);

    return '';
  }
}
