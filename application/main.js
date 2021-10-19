// import * as m1 from "../Javascript_resource/fileparser/jsonparser/shooting_anim_parser.js"
import * as m1 from "../Javascript_resource/gamelayer/module.js"
import {loopingDetect} from "../Javascript_resource/collusion/collusiontest.js"
import {gsap} from "../src/index.js";
import PixiPlugin from "../src/PixiPlugin.js"
import {keyUp,keyDown,updateKeys} from "../Javascript_resource/input/module.js"

var app;
var player;
window.onload = function(){
    app = initAndGetPixiApp(800,600,0x000000,"#pixiDiv");//初始化并获取app实例
    gsap.registerPlugin(PixiPlugin);
    m1.bindPlayerLayerTo(app.stage)
    m1.bindSpellLayerTo(app.stage)
    document.addEventListener("keydown", keyDown)
    document.addEventListener("keyup", keyUp)
    app.ticker.add(updateKeys)
    test()
}

function test() {
    let container1 = new PIXI.Container()
    let container2 = m1.getPlayerContainer()
    m1.bindLayerToSpellLayer(container1)
    m1.createSpellOn("one_shoot",null,container1)
    m1.createPlayerCharacter("reimu")
    app.ticker.add(function loop() {
        loopingDetect(container1,container2)
    })
}

export {app};