import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { menu, routeConfig } from '../../../src/constants/routes'
import { V_LAYOUT_HEADER_HEIGHT, V_LAYOUT_SIDER_SMALL_WIDTH, V_LAYOUT_SIDER_WIDTH } from "../../constants/global";
import { WHITE } from "../../constants/color";


const { SubMenu, Item } = Menu
const { Sider, Header } = Layout


class App extends Component {


    state = {
        isCollapse: false,
        contentHeight: document.documentElement.clientHeight,// 可视区域的高度
        contentWidth: document.documentElement.clientWidth // 可视区域的宽度
    }

    componentDidMount () {
        // 修改窗口大小时 更新显示区域的展示
        window.addEventListener('resize', () => this.setState({
            contentHeight: document.documentElement.clientHeight,
            contentWidth: document.documentElement.clientWidth
        }))
    }

    handleCollapseSider = () => this.setState({ isCollapse: !this.state.isCollapse })

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
        const { isCollapse } = this.state
        const width = isCollapse ? V_LAYOUT_SIDER_SMALL_WIDTH : V_LAYOUT_SIDER_WIDTH

        return <Sider width={ width } collapsed={ isCollapse } style={ { minWidth: 0 } }>
            <Menu mode='inline'
                  theme='dark'>
                <div style={ logoStyle }/>
                { this.renderMenuNode(menu) }
            </Menu>
        </Sider>
    }

    renderHeader () {
        const headerStyle = { height: V_LAYOUT_HEADER_HEIGHT, backgroundColor: WHITE }
        const iconType = this.state.isCollapse ? 'menu-fold' : 'menu-unfold'

        return <Header style={ headerStyle }>
            <Icon type={ iconType } onClick={ this.handleCollapseSider }/>
        </Header>
    }

    renderContent () {
        const { contentHeight, contentWidth, isCollapse } = this.state
        const height = contentHeight - V_LAYOUT_HEADER_HEIGHT
        const width = contentWidth - (isCollapse ? V_LAYOUT_SIDER_SMALL_WIDTH : V_LAYOUT_SIDER_WIDTH)
        const routes = routeConfig.map(route =>
            <Route key={ route.path } path={ route.path } exact={ route.exact }
                   render={ ( props ) => <route.component height={ height }
                                                          width={ width }
                                                          { ...props }/> }/>)

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
