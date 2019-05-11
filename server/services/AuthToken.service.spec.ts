import { expect } from 'chai';
import Container from "typedi";
import { AfterAll, BeforeAll, Describe, DoneCallback, It, Spec } from "../../test-libs/TestDecorators";
import { close, open } from '../test-connect';
import { AuthTokenService } from "./AuthToken.service";

@Describe(AuthTokenService, { injector: Container })
export class AuthTokenServiceSpec implements Spec<AuthTokenServiceSpec, AuthTokenService> {
  @BeforeAll(false) async 'connect' (_: any, done: DoneCallback) {
    await open();
    done();
  }

  @It 'should exist' (service: AuthTokenService) {
    expect(service).not.to.be.undefined;
  }

  @AfterAll() async 'disconnect' (_: any, done: DoneCallback) {
    await close();
    done();
  }
}
