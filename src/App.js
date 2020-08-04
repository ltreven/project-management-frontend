import React, { Component } from 'react';
import './App.css';
import ProjectList from './components/projects/ProjectList'
import ProjectDetails from './components/projects/ProjectDetails'
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Map from './components/Map';
import FileUpload from './components/FileUpload';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/Profile';
import ProtectedRoute from './auth/protected-route';
import Logout from './components/auth/Logout';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
    this.setState({
      loggedInUser: userObj
    }, () => {
      localStorage.setItem('loggedInUser', JSON.stringify(this.state.loggedInUser))
    })
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.loggedInUser} key={this.state.loggedInUser} />
        <Switch>
          <Route exact path="/">
            <h1>Esta es la homepage</h1>
          </Route>
          <Route exact path="/projects/" render={(props) => <ProjectList {...props}
            user={this.state.loggedInUser}
            key={this.state.loggedInUser} />
          } />
          <Route path="/projects/:id" render={(props) => <ProjectDetails {...props}
            user={this.state.loggedInUser} />
          } />
          <Route exact path="/map">
            <Map />
          </Route>
          <Route exact path="/fileupload">
            <FileUpload />
          </Route>

          <Route path="/signup" render={props => <Signup {...props} callback={this.getTheUser} />} />
          <Route path="/login" render={props => <Login {...props} callback={this.getTheUser} />} />

          <Route
            exact
            path="/logout"
            render={(props) => <Logout {...props} callback={this.getTheUser} />}
          />
          <ProtectedRoute
            path="/profile"
            user={this.state.loggedInUser}
            component={Profile}
          />



        </Switch>
      </div>
    );

  }

}

export default App;
