import * as PIXI from "../../JS/pixi.js"
import * as PLAYER_PARSER from "../fileparser/jsonparser/player_anim_parser.js"
import {bindCtrlObj} from "../input/module.js"

var playerContainer = new PIXI.Container()

/**
 * 
 * @param {需解析的Json文件名，不用带json后缀} sJsonName 
 * @param {额外信息，用于覆盖json解析出来的初始值} dctExtraInfo 
 */
function createPlayerCharacter(sJsonName, dctExtraInfo, onParsedCB) {
    PLAYER_PARSER.parse(sJsonName,function parseFin(animSpriteInfo) {
        if(typeof onParsedCB == 'function')onParsedCB(animSpriteInfo)
        onParsed(animSpriteInfo)
    })
}

function bindPlayerLayerTo(parent) {
    parent.addChild(playerContainer)
}

function onParsed(animSpriteInfo) {
    playerContainer.addChild(animSpriteInfo["spriteObj"])
    bindCtrlObj(animSpriteInfo)
}

function getPlayerContainer() {
    return playerContainer
}

export {bindPlayerLayerTo,createPlayerCharacter,getPlayerContainer}