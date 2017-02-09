/**
 * 新闻页面列表展示组件
 * */
import React,{Component,PropTypes} from "react";
import {Link} from "react-router";
import {TitleImg} from "../common/Index";

class NewsList extends Component {
    render() {
        return (
            <ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        return <ListItem key={item.id} {...item} />
                    })
                }
            </ul>
        );
    }
}

class ListItem extends Component {
    render() {
        let {id, title, author, visit_count, reply_count, create_at, last_reply_at} = this.props;
        return (
            <li>
                <Link to={`/topic/${id}`}>
                    <div data-flex="box:first">
                        <div className="font" data-flex="cross:center"></div>
                        <h3 className="tit">{title}</h3>
                    </div>
                    <div className="bottom" data-flex="box:first">
                        <div className="author" data-flex="cross:center">
                            <TitleImg url={author.avatar_url} />
                        </div>
                        <div className="con" data-flex="dir:top main:center">
                            <p data-flex="cross:center box:last">
                                <span className="name">{author.loginname}</span>
                                <span className="count">{reply_count}/{visit_count}</span>
                            </p>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }
    shouldComponentUpdate(newProps) {
        return false;
    }
}

export default NewsList;