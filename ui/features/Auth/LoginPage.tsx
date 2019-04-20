import React from "react";
import { RouteChildrenProps } from 'react-router';
import { tokenManager } from "../../lib/Token";
import { LoginForm } from "./LoginForm";

export class LoginPage extends React.Component<RouteChildrenProps> {
  state = {
    email: '',
    password: ''
  };
  
  handleSubmit() {
    return () => {
      console.log('herererererere');
      tokenManager.login(this.state.email, this.state.password).then(() => {
        this.props.history.push('/home');
        console.log(this);
      });
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
