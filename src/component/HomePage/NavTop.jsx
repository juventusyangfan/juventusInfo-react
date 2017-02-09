/**
 * 首页头部展示组件
 * */
import React,{Component,PropTypes} from "react";
import {Link} from "react-router";

class NavTop extends Component{
    render() {
        var setCur = {};
        setCur[this.props.tab] = 'on';
        return (
            <nav className="index-nav">
                <ul data-flex="box:mean">
                    <li className={setCur.tiyu}>
                        <Link to="/" activeClassName="active">全部</Link>
                    </li>
                    <li className={setCur.football}>
                        <Link to="/?tab=football" activeClassName="active">足球</Link>
                    </li>
                    <li className={setCur.nba}>
                        <Link to="/?tab=nba" activeClassName="active">NBA</Link>
                    </li>
                    <li className={setCur.social}>
                        <Link to="/?tab=social" activeClassName="active">其他</Link>
                    </li>
                </ul>
                <div className="height"></div>
            </nav>
        );
    }
    shouldComponentUpdate(newProps) {
        return this.props.tab !== newProps.tab; //tab和之前的不一致，组件才需要更新，否则不更新，提升性能
    }
}

export default NavTop;