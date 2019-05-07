import { BaseState } from '../../lib/SimpleState';

export class NotificationsState extends BaseState {
  message: string;
  duration: number;
  open: boolean;
}
