import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import app from "../base";
import firebase from 'firebase/app';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!user ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/login"}/>
                )
            }
        />
    );
};


export default PrivateRoute