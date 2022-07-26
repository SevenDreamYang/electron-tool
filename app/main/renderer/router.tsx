import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Root from './container/Root';
import CssTo from './container/CssTo';
import Encryption from './container/Encryption';
function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Root />
        </Route>
        <Route path="/resume" exact>
          <CssTo />
        </Route>
        <Route path="/encryption" exact>
          <Encryption />
        </Route>
      </Switch>
      <Redirect to="/encryption" />
    </HashRouter>
  );
}
export default Router;
