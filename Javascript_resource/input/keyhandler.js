//此函数用于定义按键的处理/回调函数
var controlObj;

function moveUp() {
    controlObj.y--
}

function moveLeft() {
    controlObj.x--
}

function moveDown() {
    controlObj.y++
}

function moveRight() {
    controlObj.x++
}

function setControlObj(obj){
    controlObj = obj
}


export {moveUp,moveLeft,moveDown,moveRight,setControlObj}