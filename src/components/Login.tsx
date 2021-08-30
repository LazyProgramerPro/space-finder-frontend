import React from "react";
import { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";

interface LoginProps {
  authService: AuthService;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttenpted: boolean;
  loginSuccessfull: boolean;
}

//khai bao event

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends React.Component<LoginProps, LoginState> {
  //khai bao state

  state: LoginState = {
    userName: "",
    password: "",
    loginAttenpted: false,
    loginSuccessfull: false,
  };

  private setUserName(event: CustomEvent) {
    this.setState({
      userName: event.target.value,
    });
  }

  private setPassword(event: CustomEvent) {
    this.setState({
      password: event.target.value,
    });
  }

  private async handleSubmit(event: SyntheticEvent) {
    //event kiem soat cac thanh phan
    event.preventDefault();

    this.setState({
      loginAttenpted: true,
    });

    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );

    if (result) {
      console.log("result:", result);
      this.setState({
        loginSuccessfull: true,
      });
    } else {
      console.log("wrong log");
      this.setState({
        loginSuccessfull: false,
      });
    }
  }

  render() {
    let loginMessage: any;

    if (this.state.loginAttenpted) {
      if (this.state.loginSuccessfull) {
        loginMessage = <label>Login success</label>;
      } else {
        loginMessage = <label>Login failed</label>;
      }
    }

    return (
      <div>
        <h2>Please, Login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type='text'
            value={this.state.userName}
            onChange={(e) => this.setUserName(e)}
          />
          <br />
          <input
            type='password'
            value={this.state.password}
            onChange={(e) => this.setPassword(e)}
          />
          <br />
          <input type='submit' value='Login' />
        </form>
        {loginMessage}
      </div>
    );
  }
}
