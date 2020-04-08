import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Candidatespage from './Pages/Candidatespage';
import Editpage from './Pages/Editpage';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";

let html;

function App() {

let userName = useSelector(state => state.userName)
let isAuthenticated = useSelector(state => state.isAuthenticated)

  // let checkAuth = () => {
  //   console.log("trigger checkAuth");
  //   setUser({ isAuthenticated: true });
  //   console.log(user);
  // };

  const ProtectedRoute = ({ component: Component, user, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (isAuthenticated) return <Component {...props} />;
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }}
      />
    );
  };

  const FourOhFourPage = () => {
    return (
      <div>
        <h1>404 Not Found</h1>
      </div>
    );
  };

  let switchPage = () => {
    if (isAuthenticated) {
      return (<div><Link to ="/candidates"><button>Candidates</button></Link>
      <h1>Welcome {userName}</h1></div>
     ) 
    };
    return <Route path="/" exact render={(props) => (<LoginPage {...props} />)} />

  }



  return (

    <Router>        
      <div>{switchPage()}</div>
      <Switch>
        <ProtectedRoute
          exact
          path="/candidates"
          component={Candidatespage}
        />
        <Route path="/candidates/:id" exact component={Editpage} />

        <Route path='/home' component={HomePage} />

        <Route path="*" exact component={FourOhFourPage} />
      </Switch>
    </Router>
  )
}
export default App;
