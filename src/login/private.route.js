import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../components/ui/Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser? (
          
          <RouteComponent {...routeProps} />
          
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};


export default PrivateRoute;


/*import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
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
        }
      }}
    />
  );
};
*/