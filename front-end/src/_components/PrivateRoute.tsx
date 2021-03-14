import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProps{
  Component: any;
  path: any;
}

export const PrivateRoute: React.FC<IProps> = ({ Component, path }) => (
    <Route {...path} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)