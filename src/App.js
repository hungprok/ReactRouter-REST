import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Homepage from './Pages/Homepage'
import Candidatespage from './Pages/Candidatespage';
import Editpage from './Pages/Editpage';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState({ isAuthenticated: false });
  console.log(user);

  let checkAuth = () => {
    console.log("trigger checkAuth");
    setUser({ isAuthenticated: true });
    console.log(user);
  };

  const ProtectedRoute = ({ component: Component, user, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (user.isAuthenticated) return <Component {...props} />;
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

  return (

    <Router>
      <Link to='/candidates'>Candidates</Link>

      <Switch>

        {/* <Route path="/candidates" exact component={Candidatespage} /> */}

        <Route path="/candidates/:id" component={Editpage} />

        <Route path="/" exact render={(props) => (<Homepage checkAuth={checkAuth} {...props} />)} />

        <ProtectedRoute
          exact
          user={user}
          path="/candidates"
          component={Candidatespage}
        />
        {/* <ProtectedRoute
          user={user}
          path="/candidates/:id"
          component={Editpage}
        /> */}

        <Route path="*" exact component={FourOhFourPage} />


      </Switch>
    </Router>
  )
}
export default App;
