/**
 * 公共工具类文件
 * */
import merged from "obj-merged";
import {target} from "../../config";

const Tool = {};
/**
 * ajax请求方法
 * */
Tool.ajax = (mySetting) => {
    var setting = {
        url: window.location.pathname, //默认ajax请求地址
        async: true, //默认ajax为异步请求
        type: 'GET', //请求的方式
        data: {}, //请求数据
        dataType: 'json',//请求数据类型
        success: function (text) {
        }, //请求成功执行方法
        error: function () {
        } //请求失败执行方法
    };
    for (var key in mySetting) {
        setting[key] = mySetting[key];
    }

    /**
     * 转换特殊字符
     * */
    function filter(str) {
        str += '';
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }

    /**
     * ajax请求返回处理方法
     * */
    function httpEnd() {
        if (xhr.readyState == 4) {
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText;
            //将服务器返回的数据，转换成json

            if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }

            if (xhr.status == 200) {
                setting.success(response, setting, xhr);
            } else {
                setting.error(setting, xhr);
            }
        }
    }

    var aData = [], sData = "";//用于处理提交参数
    for (var attr in setting.data) {
        aData.push(attr + '=' + filter(setting.data[attr]));
    }
    sData = aData.join('&');
    setting.type = setting.type.toUpperCase();

    var xhr = new XMLHttpRequest();
    if (setting.type == "GET") {
        xhr.open(setting.type, setting.url + '?' + sData, setting.async);
        xhr.send();
    }
    else {
        xhr.open(setting.type, setting.url, setting.async);
        xhr.send(sData);
    }

    if (setting.async) {//异步ajax请求处理
        xhr.addEventListener('readystatechange', httpEnd, false);
    } else {//同步ajax请求处理
        httpEnd();
    }

    xhr.end = function () {
        xhr.removeEventListener('readystatechange', httpEnd, false);
    };

    return xhr;
};

//post请求
Tool.post = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname,
        type: 'POST',
        data: data,
        success: success || function () {
        },
        error: error || function () {
        }
    };
    return Tool.ajax(setting);
};
//get请求
Tool.get = function (pathname, data, success, error) {
    var setting = {
        url: target + pathname,
        type: 'GET',
        data: data,
        success: success || function () {
        },
        error: error || function () {
        }
    };
    return Tool.ajax(setting);
};

export {Tool, merged}