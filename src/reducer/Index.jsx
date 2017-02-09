/**
 * Created by yangfan
 * 存储页面信息的reducer
 */
import {merged} from "../container/common/Tool";

const DB = (_ID = '', seting = {}) => {
    const cb = {
        setDefaut: () => {
            var defaults = merged({
                path: '', //当前页面的href
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                data: null, //页面的数据
                scrollX: 0, //滚动条X
                scrollY: 0, //滚动条Y
                mdrender: true //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
            }, seting);
            return {
                defaults,
                path: {}
            };
        },
        setState: (state, target) => {
            state.path[target.path] = target;
            return merged(state);
        }
    };
    return (state = {}, action = {}) => {

        if (action._ID && action._ID !== _ID) {
            return state;
        } else if (cb[action.type]) {
            return cb[action.type](state, action.target);
        } else {
            return cb.setDefaut();
        }
    }
};
const HomePage = DB('HomePage', {page: 1, nextBtn: true, num: 10, data: []}); //首页

export default {HomePage};