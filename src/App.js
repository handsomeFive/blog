import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import DefaultLayout from './routes/DefaultLayout';
import NotFound from './routes/NotFound';

const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route exact component={DefaultLayout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
