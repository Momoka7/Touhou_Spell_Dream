// 此模块用于加载/绑定按键的控制函数或对象
import * as functions from "./keyhandler.js"

var keysCB = {}
var keysMap = {}
/**
 * 默认绑定的函数功能
 */
keysCB["w"] = functions.moveUp
keysCB["a"] = functions.moveLeft
keysCB["s"] = functions.moveDown
keysCB["d"] = functions.moveRight

/**
 * 
 * @param {绑定按键控制的对象} obj 
 */
function bindCtrlObj(obj){
    functions.setControlObj(obj)
}

/**
 * 
 * @param {哪一个按键} which 
 * @param {需要绑定的处理函数} func 
 */
function redefineKeysCB(which, func){
    keysCB[which] = func
}

export {bindCtrlObj,redefineKeysCB,keysCB,keysMap}
