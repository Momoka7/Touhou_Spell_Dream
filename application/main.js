// import * as m1 from "../Javascript_resource/fileparser/jsonparser/shooting_anim_parser.js"
import * as m1 from "../Javascript_resource/gamelayer/module.js"
import {loopingDetect} from "../Javascript_resource/collusion/collusiontest.js"
import {gsap} from "../src/index.js";
import PixiPlugin from "../src/PixiPlugin.js"
import {keyUp,keyDown,updateKeys} from "../Javascript_resource/input/module.js"
import * as ctrlspell from "../Javascript_resource/spell/ctrlspell.js"
import * as ctrlplayer from "../Javascript_resource/player/ctrlplayer.js"
var app;
window.onload = function(){
    app = initAndGetPixiApp(800,600,0x00ff00,"#pixiDiv");//初始化并获取app实例
    gsap.registerPlugin(PixiPlugin);
    m1.bindPlayerLayerTo(app.stage)
    m1.bindSpellLayerTo(app.stage)
    document.addEventListener("keydown", keyDown)
    document.addEventListener("keyup", keyUp)
    app.ticker.add(updateKeys)
    test()
}

function test() {
    ctrlplayer.createPlayer("reimu")
    ctrlspell.createSpellStringBy("one_shoot","one_shoot")
    app.ticker.add(function loop() {
        loopingDetect(m1.getPlayerContainer(),ctrlspell.getSpellContainerBySpriteID("one_shoot"))
    })
}

export {app};