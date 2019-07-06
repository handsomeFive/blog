import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { menu, routeConfig } from '../../../src/constants/routes'
import { V_LAYOUT_HEADER_HEIGHT } from "../../constants/global";
import { WHITE } from "../../constants/color";


const { SubMenu, Item } = Menu
const { Sider, Header, Content } = Layout


class App extends Component {

    renderMenuNode = ( list ) => list.map(( { children, title, path } ) => {
        if (children) {
            return <SubMenu key={ title }
                            title={ title }>{ this.renderMenuNode(children) }</SubMenu>
        }
        return <Item key={ path }>
            <Link to={ { pathname: path } }>{ title }</Link>
        </Item>
    })


    renderSider () {

        const logoStyle = { height: V_LAYOUT_HEADER_HEIGHT }

        return <Sider>
            <Menu mode='inline'
                  theme='dark'>
                <div style={ logoStyle }/>
                { this.renderMenuNode(menu) }
            </Menu>
        </Sider>
    }

    renderHeader () {
        const headerStyle = { height: V_LAYOUT_HEADER_HEIGHT, backgroundColor: WHITE }

        return <Header style={ headerStyle }/>
    }

    renderContent () {
        const routes = routeConfig.map(route =>
            <Route key={ route.path } path={ route.path } render={ ( props ) => <route.component { ...props }/> }/>)

        return <Switch>
            { routes }
            <Redirect to='notFound'/>
        </Switch>
    }

    render () {
        return <Layout className='height1'>
            { this.renderSider() }
            <Layout>
                { this.renderHeader() }
                { this.renderContent() }
            </Layout>
        </Layout>
    }
}

export default App;
