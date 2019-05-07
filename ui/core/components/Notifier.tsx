import { Snackbar } from '@material-ui/core';
import React from 'react';
import { StateSetter, withMapState } from '../../lib/SimpleState';
import { NotificationsState } from '../states/Notifications';


interface NotifierProps {
  message: string;
  duration: number;
  open: boolean;
  set: StateSetter<NotificationsState>;
}

const NotifierComponent = (
  {
    set,
    duration,
    message,
    open
  }: NotifierProps
) => {
  if (message) {
    set('open', true);
    setTimeout(() => {
      set('open', false);
      setTimeout(() => {
        set('message', null);
      }, 150);
    }, duration);
  }

  return <Snackbar message={message} open={open} />
}

export const Notifier = withMapState([NotificationsState])(NotifierComponent)(([state], getSetter) => {
  const message = state.message;
  const duration = state.duration || 500;

  return {
    message,
    duration,
    open: state.open,
    set: getSetter(NotificationsState)
  };
});
