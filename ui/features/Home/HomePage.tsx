import { Button } from '@material-ui/core';
import React from 'react';
import { AppHeader } from '../../core/components/AppHeader';
import { StateSetter, withMapState } from '../../lib/SimpleState';
import { HomeState } from './HomeState';

interface HomePageProps {
  message: string;
  set: StateSetter<HomeState>;
}

const HomePageComponent: React.FunctionComponent<HomePageProps> = ({ message, set }: HomePageProps) => (<div>
  <AppHeader></AppHeader>
  <Button onClick={() => {
    const newMessage = message.includes('hello') ? 'goodbye' : 'hello';
    set('message', newMessage);
  }}>Toggle</Button>
  {message}
</div>);

export const HomePage = withMapState([HomeState])(HomePageComponent)(([state], getSetter) => {
  return {
    message: state.message,
    set: getSetter(HomeState)
  };
});
