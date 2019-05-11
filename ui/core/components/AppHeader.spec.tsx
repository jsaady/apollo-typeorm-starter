import { AppBar } from '@material-ui/core';
import { expect } from 'chai';
import { ShallowWrapper } from 'enzyme';
import 'reflect-metadata';
import { Describe, It, Spec, TestTypes } from '../../../test-libs/TestDecorators';
import { AppHeader } from './AppHeader';
window.fetch = function () {} as any;

@Describe(AppHeader, {
  injector: null,
  type: TestTypes.ReactComponent
})
export class AppHeaderSpec implements Spec<AppHeaderSpec, ShallowWrapper<any, any, typeof AppHeader>> {
  @It 'should exist' (comp: ShallowWrapper<any, any, typeof AppHeader>) {
    expect(comp).to.not.be.undefined;
  }

  @It 'should have an AppBar' (comp: ShallowWrapper<any, any, typeof AppHeader>) {
    console.log(comp.render().html());
    const hasAppBar = comp.find(AppBar).length > 0;
    expect(hasAppBar).to.be.true;
  }
}