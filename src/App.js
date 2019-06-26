import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router'
import {Button, Layout} from 'antd'
import {createBrowserHistory} from 'history'

const {Sider, Header, Content} = Layout
const browserHistory = createBrowserHistory()

class App extends Component {


    renderSider() {
        return <Sider></Sider>
    }

    renderHeader() {
        return <Header>
            <Button>233</Button>
        </Header>
    }

    renderContent() {
        return <Router history={browserHistory}>
            <Switch>
                <Route></Route>
            </Switch>
        </Router>
    }

    render() {
        return <Layout className='height1'>
            {this.renderSider()}
            <Layout>
                {this.renderHeader()}
                {this.renderContent()}
            </Layout>
        </Layout>
    }
}

export default App;
