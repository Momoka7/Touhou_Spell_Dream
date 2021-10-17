import {bindCtrlObj,redefineKeysCB,keysCB,keysMap} from "./funloader.js"

function keyDown(e) {
    keysMap[e.key] = true
    for (let p in keysCB) {
        if (keysMap[p]) {
            keysCB[p]()
        }
    }
}

function keyUp(e) {
    keysMap[e.key] = false
}

function getKeysCB(){
    if(!keysCB){
        keysCB = {}
    }
    return keysCB
}

function getKeysMap(){
    if(!keysMap){
        keysMap = {}
    }
    return keysMap
}
/**
 * keyDown和keyUp暴露给input以外的模块使用，一般是作为键盘监听事件函数的参数传入
 */
export {getKeysCB, getKeysMap, keyDown, keyUp, bindCtrlObj, redefineKeysCB}