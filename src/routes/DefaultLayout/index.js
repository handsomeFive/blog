import React, {Component} from 'react';
import {Router, Switch, Route, Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import { Layout, Menu} from 'antd'
import {menu, routeConfig} from '../../../src/constants/routes'


const {SubMenu,Item}= Menu
const {Sider, Header, Content} = Layout

class App extends Component {

    renderMenuNode =(list)=> list.map(({children,title,path})=>{
        if (children){
            return <SubMenu key={title}
                            title={title}>{this.renderMenuNode(children)}</SubMenu>
        }
        return  <Item key={path}>
            <Link to={{pathname:path}}>{title}</Link>
        </Item>
    })


    renderSider() {
        return <Sider>
            <Menu mode='inline'
                  theme='dark'>
                {this.renderMenuNode(menu)}
            </Menu>
        </Sider>
    }

    renderHeader() {
        return <Header></Header>
    }

    renderContent() {
        const routes=routeConfig.map(route=>
            <Route key={route.path} path={route.path} render={(props)=><route.component {...props}/>}/>)

        return<Switch>
            {routes}
            <Redirect to='notFound'/>
            </Switch>
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
