// import * as m1 from "../Javascript_resource/fileparser/jsonparser/shooting_anim_parser.js"
import * as m1 from "../Javascript_resource/fileparser/jsonparser/player_anim_parser.js"
import {gsap} from "../src/index.js";
import PixiPlugin from "../src/PixiPlugin.js"
import {keyUp,keyDown,bindCtrlObj, redefineKeysCB} from "../Javascript_resource/input/module.js"
/**
 * 游戏主要脚本处理
 * 流程:    1.创建PIXI实例app
 *          2.创建若干个容器Container
 *          3.创建若干个Sprites
 *          4.将Sprites分组加入容器
 *          5.读取配置文件
 *          6.添加键盘处理逻辑
 *          7.添加Sprites动画效果
 *          
 */
var app;
var player;
window.onload = function(){
    app = initAndGetPixiApp(800,600,0x000000,"#pixiDiv");//初始化并获取app实例
    gsap.registerPlugin(PixiPlugin);
    m1.parse(123,onParsed)
    document.addEventListener("keydown", keyDown)
    document.addEventListener("keyup", keyUp)
    
}

function onParsed(spriteObj) {
    bindCtrlObj(spriteObj)
    return spriteObj
}

export {app};