import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import cookie from "../utils/cookie";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        cookie.getCookie("userId").value !== null
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
)


export default PrivateRoute;