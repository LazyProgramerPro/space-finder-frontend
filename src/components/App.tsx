import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import history from "./../utils/history";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { Spaces } from "./spaces/Spaces";
import { DataService } from "../services/DataService";

//{},{} ===>props,state

//khai bao state cho App sau do khoi tao cac model lien quan

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
    };
    this.setUser = this.setUser.bind(this);
  }
  //Khoi tao cac service can thiet

  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  private setUser(user: User) {
    this.setState({
      user: user,
    });
  }

  render() {
    return (
      <div className='wrapper'>
        {/* Khai bao cac dinh tuyen Router, khai bao History, khoi tao history cua trinh duyet */}
        <Router history={history}>
          <Navbar user={this.state.user} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login'>
              <Login authService={this.authService} setUser={this.setUser} />
            </Route>
            <Route exact path='/profile'>
              <Profile authService={this.authService} user={this.state.user} />
            </Route>
            <Route exact path='/spaces'>
              <Spaces dataService={this.dataService} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
