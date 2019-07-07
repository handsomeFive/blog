import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router'
import {createBrowserHistory} from 'history'
import DefaultLayout from "./routes/DefaultLayout";
import NotFound from "./routes/NotFound";


const browserHistory = createBrowserHistory()

class App extends Component {
    render() {
        return <Router history={browserHistory}>
                <Switch>
                    <Switch>
                        <Route exact component={DefaultLayout}/>
                        <Route path='/notFound' component={NotFound}/>
                    </Switch>
                </Switch>
        </Router>
    }
}

export default App;
