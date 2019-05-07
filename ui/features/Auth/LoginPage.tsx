import { ApolloError } from 'apollo-boost';
import React from "react";
import { RouteChildrenProps } from 'react-router';
import { NotificationsState } from '../../core/states/Notifications';
import { StateSetter, withMapState } from '../../lib/SimpleState';
import { tokenManager } from "../../lib/Token";
import { LoginForm } from "./LoginForm";

interface LoginPageProps extends RouteChildrenProps {
  set: StateSetter<NotificationsState>;
}

export class LoginPageComponent extends React.Component<LoginPageProps> {
  state = {
    email: '',
    password: ''
  };
  
  handleSubmit() {
    return async () => {
      try {
        await tokenManager.login(this.state.email, this.state.password);
        this.props.history.push('/home');
      } catch (e) {
        if (e instanceof ApolloError) {
          this.props.set('message', e.message);
          this.props.set('duration', 2500);
        }
      }
    };
  }

  handleChange(prop: 'email'|'password') {
    return (newValue: string) => {
      this.setState({
        [prop]: newValue
      });
    };
  }

  render () {
    return <LoginForm
      email={this.state.email}
      password={this.state.password}
      emailChanged={this.handleChange('email')}
      passwordChanged={this.handleChange('password')} 
      formSubmitted={this.handleSubmit()} />
  }
}

export const LoginPage = withMapState([NotificationsState])(LoginPageComponent)((_, getSetter) => ({
  set: getSetter(NotificationsState)
}));
