//此函数用于定义按键的处理/回调函数
var controlObj
var key2Movement = {
    "w":"moveup",
    "s":"movedown",
    "a":"moveleft",
    "d":"moveright"
}

function moveUp() {
    controlObj["spriteObj"].y -= controlObj["spriteObj"].moveSpeed["normal"]
    if(!controlObj["moveState"].includes("moveup")){
        controlObj["spriteObj"].textures = controlObj["moveup"]
        controlObj["spriteObj"].gotoAndPlay(1);
        controlObj["moveState"].push("moveup")
    }
}

function moveLeft() {
    controlObj["spriteObj"].x -= controlObj["spriteObj"].moveSpeed["normal"]
    if(!controlObj["moveState"].includes("moveleft")){
        controlObj["spriteObj"].textures = controlObj["moveleft"]
        controlObj["spriteObj"].gotoAndPlay(1);
        controlObj["moveState"].push("moveleft")
    }
}

function moveDown() {
    controlObj["spriteObj"].y += controlObj["spriteObj"].moveSpeed["normal"]
    if(!controlObj["moveState"].includes("movedown")){
        controlObj["spriteObj"].textures = controlObj["movedown"]
        controlObj["spriteObj"].gotoAndPlay(1);
        controlObj["moveState"].push("movedown")
    }
}

function moveRight() {
    controlObj["spriteObj"].x += controlObj["spriteObj"].moveSpeed["normal"]
    if(!controlObj["moveState"].includes("moveright")){
        controlObj["spriteObj"].textures = controlObj["moveright"]
        controlObj["spriteObj"].gotoAndPlay(1);
        controlObj["moveState"].push("moveright")
    }
}

function releaseKey(key){
    let idx = controlObj["moveState"].indexOf(key2Movement[key])
    if(idx >= 0){
        controlObj["moveState"].splice(idx, 1);
    }
    if(controlObj["moveState"].length == 0){
        controlObj["spriteObj"].textures = controlObj["moveup"]
        controlObj["spriteObj"].gotoAndPlay(1);
    }
}

function setControlObj(obj){
    controlObj = obj
}

function getControlObj(obj){
    return controlObj
}


export {moveUp,moveLeft,moveDown,moveRight,setControlObj,getControlObj,releaseKey}