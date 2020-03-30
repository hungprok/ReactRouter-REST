import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Homepage from './Pages/Homepage'
import Candidatespage from './Pages/Candidatespage';
import Editpage from './Pages/Editpage';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState({ isAuthenticated: true });

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

    
    <Switch>
      <Router>


        <Route path="/candidates" exact component={Candidatespage} />

        <Route path="/candidates/:id" component={Editpage} />

        <Route path="/" exact component={Homepage} />

        <ProtectedRoute
          exact
          user={user}
          path="/candidates"
          component={Candidatespage}
        />
        <ProtectedRoute
          user={user}
          path="/candidates/:id"
          component={Editpage}
        />

        <Route path="*" component={FourOhFourPage} />

      </Router>
    </Switch>
  )
}
export default App;
