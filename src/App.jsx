/**
 * Created by yangfan
 * 项目的入口文件
 */
import React, {Component,PropTypes} from "react";
import ReactDOM, {render} from "react-dom";
import {Provider} from "react-redux";
import route from "./route";
import store from "./store";

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.getElementById("app")
);