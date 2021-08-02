import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import { WHITE } from '../../constants/color';
import { BASIC_ROUTE, routeConfig } from '../../../src/constants/routes';
import { CustomIcon } from '../../component/CustomIcon/index';
import {
  V_LAYOUT_AREA_GAP,
  V_LAYOUT_HEADER_HEIGHT,
  V_LAYOUT_TYPE_AREA,
} from '../../constants/global';
import NotFound from '../NotFound';

const { SubMenu, Item } = Menu;
const { Header } = Layout;

class App extends Component {
  state = {};

  renderMenuNode = (list) =>
    list.map(({ children, title, icon, path }) => {
      if (children) {
        return (
          <SubMenu
            key={title}
            title={
              <span>
                <CustomIcon type={icon} />
                <span>{title}</span>
              </span>
            }
          >
            {this.renderMenuNode(children)}
          </SubMenu>
        );
      }
      return (
        <Item key={path}>
          <Link to={{ pathname: path }}>{title}</Link>
        </Item>
      );
    });

  renderHeader() {
    const headerStyle = {
      height: V_LAYOUT_HEADER_HEIGHT,
      lineHeight: V_LAYOUT_HEADER_HEIGHT + 'px',
      backgroundColor: WHITE,
    };
    const contentStyle = {
      width: V_LAYOUT_TYPE_AREA,
      margin: '0 auto',
      paddingLeft: V_LAYOUT_AREA_GAP,
      paddingRight: V_LAYOUT_AREA_GAP,
    };
    const labelStyle = { margin: '0 16px' };

    return (
      <Header style={headerStyle}>
        <div style={contentStyle}>
          <Avatar size={32} icon="user" />
        </div>
      </Header>
    );
  }

  renderContent() {
    const routes = routeConfig.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        render={(props) => (
          <route.component catalogue={route.catalogue} {...props} />
        )}
      />
    ));

    return (
      <Switch>
        {routes}
        <Route path="/blog/notFound" component={NotFound} />
        <Redirect to="notFound" />
      </Switch>
    );
  }

  render() {
    return (
      <Layout className="height1" style={{ backgroundColor: '#f6f6f6' }}>
        {this.renderHeader()}
        {this.renderContent()}
      </Layout>
    );
  }
}

export default App;
