/**
 * 用户处理键盘事件
 */

//键盘按下事件
function keysDown(e) {
    keys[e.key] = true;
}
//键盘松开事件
function keysUp(e) {
    keys[e.key] = false;
}
//监听键盘事件
function keysListener() {
    if (keys['w']) {
    }
    if (keys['s']) {
    }
    if (keys['a']) {
    }
    if (keys['d']) {
    }
}