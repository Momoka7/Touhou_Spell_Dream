//玩家的控制层
import {keyUp,keyDown,bindCtrlObj, redefineKeysCB} from "../input/module.js"
import * as gamelayer from "../gamelayer/module.js"
import {app} from "../../application/main.js"

var playerMgr = {}

function createPlayer(name) {
    gamelayer.createPlayerCharacter(name,null,function parsedFin(animSpriteInfo) {
        playerMgr[name] = animSpriteInfo
    })
}

function getPlayerByName(name) {
    return playerMgr[name]
}


