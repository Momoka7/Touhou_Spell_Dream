import {app} from "../../application/main.js"
import * as gamelayer from "../gamelayer/module.js"
/**
 * key:spriteID
 * 
 */
var spellMgr={}

function createSpellStringBy(oSpriteInfo, sSpellName) {
    let spellStringContainer = new PIXI.Container()
    gamelayer.bindLayerToSpellLayer(spellStringContainer)
    gamelayer.createSpellOn(sSpellName,null,spellStringContainer)
    if(typeof oSpriteInfo == "object")
        spellMgr[oSpriteInfo.alias] = spellStringContainer
    else
        spellMgr[sSpellName] = spellStringContainer
}

function getSpellContainerBySpriteID(spriteID) {
    return spellMgr[spriteID]
}

export {createSpellStringBy,getSpellContainerBySpriteID}