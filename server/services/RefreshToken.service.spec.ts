import { expect } from 'chai';
import Container from "typedi";
import { AfterAll, BeforeAll, Describe, DoneCallback, It, Spec } from "../../test-libs/TestDecorators";
import { close, open } from '../test-connect';
import { RefreshTokenService } from "./RefreshToken.service";

@Describe(RefreshTokenService, { injector: Container })
export class RefreshTokenServiceSpec implements Spec<RefreshTokenServiceSpec, RefreshTokenService> {
  @BeforeAll(false) async 'connect' (_: any, done: DoneCallback) {
    await open();
    done();
  }

  @It 'should exist' (service: RefreshTokenService) {
    expect(service).not.to.be.undefined;
  }

  

  @AfterAll() async 'disconnect' (_: any, done: DoneCallback) {
    await close();
    done();
  }
}
