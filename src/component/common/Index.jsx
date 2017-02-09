/**
 * Created by yangfan on 2017/2/5.
 * 公共展示组件
 */
import React,{Component} from "react";
import { Router, Route, IndexRoute, browserHistory, Link } from "react-router";
import { connect } from "react-redux";
import action from "../../action";
import { Tool, merged } from "../../container/common/Tool";

/**
 * 加载过场展示
 * */
class DataLoad extends Component {
    render() {
        let {loadAnimation, loadMsg}=this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        )
    }
}
DataLoad.defaultProps = {//默认显示加载动画
    loadAnimation: true,
    loadMsg: '正在加载'
};

/**
 * 公共头部
 * */
class Header extends Comment {
    render() {
        let {title, leftTo, leftIcon, rightTo, rightIcon, rightClick } = this.props;
        let left = null;

        if (leftTo && leftIcon) {
            left = (
                <Link to={leftTo}>
                    <i className={'iconfont icon-' + leftIcon}></i>
                </Link>
            );
        } else if (leftIcon === 'fanhui') { //返回上一页
            left = (
                <a onClick={this.context.router.goBack}>
                    <i className={'iconfont icon-' + leftIcon}></i>
                </a>
            );
        }

        let right = null;
        if (rightTo && rightIcon) {
            right = (
                <Link to={rightTo}>
                    <i className={'iconfont icon-' + rightIcon}></i>
                </Link>
            );
        } else if (rightClick && rightIcon) {
            right = (
                <div onClick={rightClick}>
                    <i className={'iconfont icon-' + rightIcon}></i>
                </div>
            );
        }
        return (
            <header className="common-header" data-flex>
                <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    {left}
                </div>
                <h2 className="title" data-flex-box="1">{title}</h2>

                <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    {right}
                </div>
            </header>
        );
    }
}
Header.contextTypes = {
    router: React.PropTypes.object.isRequired
};

/**
 * 暂无记录展示
 * */
class DataNull extends Component {
    render() {
        return (
            <div>暂无记录</div>
        );
    }
}

/**
 * 底部菜单
 * */
class Footer extends Component {
    render() {
        var arr = [];
        arr[this.props.index] = 'on';
        return (
            <footer className="common-footer">
                <div className="zhanwei"></div>
                <ul className="menu" data-flex="box:mean">
                    <li className={arr[0]}>
                        <Link to="/">
                            <i className="iconfont icon-shouye"></i>新闻
                        </Link>
                    </li>
                    <li className={arr[1]}>
                        <Link to="">
                            <i className="iconfont icon-wode"></i>球员
                        </Link>
                    </li>
                    <li className={arr[2]}>
                        <Link to="">
                            <i className="iconfont icon-xiaoxi"></i>球场
                        </Link>
                    </li>
                </ul>
            </footer>
        )
    }
}
Footer.defaultProps = {
    index: 0
};

/**
 * 标题图片
 * */
class TitleImg extends Component {
    render() {
        return (<div className="user-headimg" style={{ backgroundImage: 'url(' + this.props.url + ')' }}></div>)
    }
}

export {DataLoad,Header,DataNull,Footer,TitleImg};