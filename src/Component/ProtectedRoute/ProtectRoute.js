import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import cookie from "../utils/cookie";


const ProtectRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        cookie.getCookie("x-auth-token").value !== null && cookie.getCookie("username").value !== null
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)


export default ProtectRoute;