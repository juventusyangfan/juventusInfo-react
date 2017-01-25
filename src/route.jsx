/**
 * Created by yangfan
 * 项目的路由配置文件
 */
import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const routes = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={HomePage} />
        </Route>
    </Router>
);

export default routes;