import React from 'react';
import { Route, Redirect } from 'react-router';
import NotFound from './components/404-not-found/index';

export default () => (
    <Route>
        <Route path="*" component={NotFound}/>
    </Route>
)