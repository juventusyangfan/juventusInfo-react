/**
 * Created by yangfan on 2017/1/25.
 */
export default (_ID) => {
    var action = {};
    var arr = [
        'setState' //设置状态
    ];

    for (let i = 0; i < arr.length; i++) {
        action[arr[i]] = (target) => {
            return { _ID: _ID, target: target, type: arr[i] };
        }
    }

    return action;
}