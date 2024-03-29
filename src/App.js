import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt} from 'react-router-dom'
import './App.css';

const User = (name) => {
  console.log(name, 'name')
  return (<h1>User {name.username.match.params.username}</h1>)
}
const Login = (name) => {
  console.log(name, 'name')
  return (<h1>Login Page</h1>)
}

class App extends Component {
  state = {
    params: null,
    loginState: false
  }

  loginHandler = () => {
    this.setState(prevState => ({
      loginState: !prevState.loginState
    }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <NavLink to="/login" exact strict activeStyle={{color: "green"}}>Login</NavLink>
            </li>
            <li>
              <NavLink to="/about" exact strict activeStyle={{color: "green"}}>About</NavLink>
            </li>
            <li>
              <NavLink to="/user/avis" exact strict activeStyle={{color: "green"}}>User Avis</NavLink>
            </li>
          </ul>
          <Prompt when={!this.state.loginState}
            message={(location) => {
              return location.pathname.startsWith('/user') ? 'Please login to access user Avis' : true  
            }}
          />
          <input type="button" value={this.state.loginState ? 'logout' : 'Login'} onClick={this.loginHandler}/>
          <Route path="/login" exact strict component={Login}/>
          <Route path="/about" exact strict render={() => {
            return (<h1>About Page</h1>)
          }}/>
          <Route path="/user/:username" exact strict render={(match) => {
            return this.state.loginState ? (<User username={match}/>) : (<Redirect to="/"/>)
          }}/>
        </div>
      </Router>
    );
  }
}

export default App;
