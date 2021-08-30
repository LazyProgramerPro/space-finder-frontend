import React from "react";
import { User } from "../model/Model";
import {AuthService} from '../services/AuthService'
import {Login} from './Login'


//{},{} ===>props,state

//khai bao state cho App sau do khoi tao cac model lien quan

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, AppState> {

  //Khoi tao cac service can thiet

  private authServicer: AuthService = new AuthService()

  render() {
    return <div>Thuong 
      <Login  authService={this.authServicer}/>
    </div>;
  }
}
