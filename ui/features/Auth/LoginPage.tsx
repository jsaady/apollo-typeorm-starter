import React from "react";
import { tokenManager } from "../../lib/Token";
import { LoginForm } from "./LoginForm";

export class LoginPage extends React.Component {
  state = {
    email: '',
    password: ''
  };
  
  handleSubmit() {
    return () => {
      tokenManager.login(this.state.email, this.state.password);
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
