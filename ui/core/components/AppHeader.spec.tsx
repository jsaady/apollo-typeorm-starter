import { expect } from 'chai';
import { ShallowWrapper } from 'enzyme';
import React from 'react';
import 'reflect-metadata';
import { Describe, It, Spec, TestTypes } from '../../../test-libs/TestDecorators';
import { AppHeaderComp, AppHeaderProps } from './AppHeader';
window.fetch = function () {} as any;

const mock: any = jest.fn();

let props: AppHeaderProps = {
 classes: {
    root: 'root',
    grow: 'grow',
    menuButton: 'menuButton'
  },
  location: mock,
  history: mock,
  match: mock
};

let AppHeader = () => <AppHeaderComp { ...props } />;

const classes = props.classes;
@Describe(AppHeader, {
  injector: null,
  type: TestTypes.ReactComponent
})
export class AppHeaderSpec implements Spec<AppHeaderSpec, ShallowWrapper<any, any, typeof AppHeader>> {
  @It 'should exist' (comp: ShallowWrapper<any, any, typeof AppHeader>) {
    expect(comp).to.not.be.undefined;
  }
}
