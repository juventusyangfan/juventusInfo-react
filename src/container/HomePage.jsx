/**
 * 首页的控制组件
 * */
import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import {Footer} from "../component/common/Index";
import NavTop from "../component/HomePage/NavTop";
import NewsList from "../component/HomePage/NewsList";
import GetNextPage from "./common/GetNextPage";
import {APIKEY} from "../config";

class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var {data, loadAnimation, loadMsg} = this.props.state;
        var tab = this.props.location.query.tab || 'tiyu';
        return (
            <div className="index-list-box">
                <NavTop tab={tab}/>
                {
                    data.length > 0 ? <List list={data}/> : null
                }
                <Footer index="0"/>
            </div>
        );
    }
}

export default GetNextPage({
    id: 'HomePage',  //应用关联使用的redux
    component: HomePage, //接收数据的组件入口
    url: (props, state) => {
        return '/api/' + (props.location.query.tab || 'tiyu')
    },
    data: (props, state) => { //发送给服务器的数据
        var {page, num} = state;
        return {
            tab: props.location.query.tab || 'tiyu',
            page,
            num,
            key:APIKEY
        }
    },
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});