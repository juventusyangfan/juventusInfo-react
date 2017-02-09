/**
 * Created by yangfan on 2017/2/5.
 * 请求数据更新state和props
 */
import React,{Component} from "react";
import { Router, Route, IndexRoute, browserHistory, Link } from "react-router";
import { connect } from "react-redux";
import action from "../../action";
import { Tool, merged } from "./Tool";
import {target} from "../../config";
import {DataLoad} from "../../component/common/Index"
import GetNextPage from 'get-next-page';

/**
 * 模块入口
 * */
const Main = (mySetting) => {
    var setting = {
        id: '', //模块命名的唯一标识
        type: 'GET', //请求类型
        url: '', //请求地址
        data: null, //请求数据
        component: <div></div>, //装载回调数据的组件
        success: (state) => {
            return state;
        }, //请求成功后执行的方法
        error: (state) => {
            return state;
        } //请求失败后执行的方法
    };
    for (let key in mySetting) {
        setting[key] = mySetting[key];
    }

    /**
     * 组件入口
     * */
    class Index extends Component {
        constructor(props) {
            super(props);

            /**
             * 初始化state
             * */
            this.initState = (props) => {
                var {state, location} = props;
                var {pathname, search} = location;
                this.path = pathname + search;
                if (typeof this.action == 'undefined' && location.action == 'PUSH') {
                    this.action = false;
                } else {
                    this.action = true;
                }

                if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path && this.action) {
                    this.state = state.path[this.path];//复制path数据
                } else {
                    this.state = merged(state.defaults); //从默认对象中复制
                    this.state.path = this.path;
                    this.action = false;
                }
            };

            /**
             * DOM初始化完成后执行回调
             * */
            this.readyDom = () => {
                var {success,error}=this.props.setting;
                var {scrollX, scrollY} = this.state;//获得滚动条位置
                if (this.get) {
                    return false;
                }//判断是否已加载
                window.scrollTo(scrollX, scrollY); //设置滚动条位置

                this.get = new GetNextPage(this.refs.dataload, {
                    url: target + this.getUrl(),
                    data: this.getData(),
                    start: this.start,
                    load: this.load,
                    error: this.error
                });
            }

            this.getUrl = () => {//获取请求url
                var {url}=this.props.setting;
                if (typeof url === 'function') {
                    return url(this.props, this.state);
                } else if (url && typeof url === 'string') {
                    return url;
                } else {
                    return this.props.location.pathname;//默认请求当前页
                }
            };
            this.getData = () => {//获取请求数据
                var {data} = this.props.setting;
                if (typeof data === 'function') {
                    return data(this.props, this.state);
                } else if (data && typeof data === 'string') {
                    return data;
                } else {
                    return this.props.location.query;//默认获取当前也地址中参数
                }
            };
            this.start = () => {//开始请求
                this.state.loadAnimation = true;
                this.state.loadMsg = '正在加载中...';
                this.props.setState(this.state);
            };
            this.load = (res) => {//请求加载成功
                var {state } = this;
                var {data} = res;
                if (!data.length && data.length < before.limit) {
                    state.nextBtn = false;
                    state.loadMsg = '加载完成';
                } else {
                    state.nextBtn = true;
                    state.loadMsg = '上拉加载更多';
                }
                Array.prototype.push.apply(state.data, data);
                state.loadAnimation = false;
                state.page = ++state.page;
                this.props.setState(state);
            };
            this.error = () => {//加载失败
                this.state.loadAnimation = false;
                this.state.loadMsg = '加载失败';
                this.props.setState(this.state);
            }

            /**
             * 组件卸载前操作
             * */
            this.unmount = () => {
                if (typeof this.get != 'undefined') {
                    this.get.end();
                    delete this.get;
                }
                this.state.scrollX = window.scrollX; //记录滚动条位置
                this.state.scrollY = window.scrollY;
                this.props.setState(this.state);
            };

            this.initState(this.props);
        }

        render() {
            var {loadAnimation, loadMsg} = this.state;
            return (
                <div>
                    <this.props.setting.component {...this.props} state={this.state}/>
                    <div ref="dataload"><DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg}/></div>
                </div>
            )
        }

        /**
         * 初始化后绑定加载事件
         * */
        componentDidMount() {
            this.readyDom();
        }

        /**
         * props更新时，重新设置state更新页面
         * */
        componentWillReceiveProps(newProps) {
            var {location}=newProps;
            var {pathname, search} = location;
            var path = pathname + search;
            if (this.path !== path) {
                this.unmount(); //卸载之前组件
            }
            this.initState(newProps);
        }

        /**
         * 更新后绑定加载事件
         * */
        componentDidUpdate() {
            this.readyDom();
        }

        /**
         * 移除组件时卸载
         * */
        componentWillUnmount() {
            this.unmount(); //卸载之前组件
        }
    }
    Index.defaultProps = {setting};

    return connect((state) => {
        return {
            state: state[setting.id]
        }
    }, action(action.id))(Index);//连接redux
};

export default Main;