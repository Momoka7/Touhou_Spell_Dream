import * as PIXI from "../../JS/pixi.js"
import * as SPELL_PARSER from "../fileparser/jsonparser/shooting_anim_parser.js"

var spellContainer = new PIXI.Container()

/**
 * 
 * @param {需解析的Json文件名，不用带json后缀} sJsonName 
 * @param {额外信息，用于覆盖json解析出来的初始值} dctExtraInfo 
 * @param {创建弹幕需要指定其所在容器/图层} oLayer
 */
function createSpellOn(sJsonName, dctExtraInfo, oLayer) {
    SPELL_PARSER.parse(sJsonName,function parseFin(spriteObj) {
        onParsed(spriteObj,oLayer)
    })
}

function bindSpellLayerTo(parent) {
    parent.addChild(spellContainer)
}

function bindLayerToSpellLayer(layer) {
    spellContainer.addChild(layer)
}

function onParsed(spriteObj,oLayer) {
    oLayer.addChild(spriteObj)
}

export {bindSpellLayerTo,bindLayerToSpellLayer,createSpellOn}