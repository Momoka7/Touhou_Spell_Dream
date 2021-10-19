import * as PIXI from "../../../JS/pixi.js"

var loader

export function parse(name, func){
    let url = "../../../asserts/characters/"+name+".json"   //暂时硬编码，待更改
    let request = new XMLHttpRequest()
    request.open("get", url)
    request.send(null)
    request.onload = function () {
        if(request.status == 200){
            let json = JSON.parse(request.responseText)
            parseImgRes(json["extra_info"]["assert_path"], json, func)
        }
    }
}

function parseImgRes(imgPath, json, func) {
    loader = new PIXI.Loader()
    loader.add(json["extra_info"]["alias"], "../../../asserts/images/"+imgPath).load(function(loader, resources){
        onResLoaded(loader, resources, json, func)
    });
}

/**
 * 应用解析结果，一般为将对象放到画布中
 * @param {所控制的Sprite对象} spriteObj 
 * @param {加载完成后的回调函数}} func 
 */
function applyRes(animSpriteInfo, func){
    func(animSpriteInfo)
}

function initState(obj,json) {
    obj.x = json["init_state"]["start_point"]["x"]
    obj.y = json["init_state"]["start_point"]["y"]
    obj.moveSpeed = json["init_state"]["move_speed"]
    obj.scale.x = json["init_state"]["scale"]["x"]
    obj.scale.y = json["init_state"]["scale"]["y"]
    obj.gotoAndPlay(1);
}

function onResLoaded(loader, resources, json, func){
    loader.destroy()
    loader = null
    let sheet = new PIXI.BaseTexture.from(resources[json["extra_info"]["alias"]].url)
    let animSpriteInfo = {}
    let width = json["movement_frames"]["common_info"]["width"]
    let height = json["movement_frames"]["common_info"]["height"]
    for(var singleMovement in json["movement_frames"]["frames_info"]){
        let animSheetArr = []
        let x = json["movement_frames"]["frames_info"][singleMovement]["init_pos"]["x"]
        let y = json["movement_frames"]["frames_info"][singleMovement]["init_pos"]["y"]
        let offsetX = json["movement_frames"]["frames_info"][singleMovement]["inter_frame_offset"]["x"]
        let offsetY = json["movement_frames"]["frames_info"][singleMovement]["inter_frame_offset"]["y"]
        for(let i = 0; i < json["movement_frames"]["frames_info"][singleMovement]["frame_num"];i++){
            animSheetArr.push(new PIXI.Texture(sheet, new PIXI.Rectangle(x + i*offsetX, y + i*offsetY, width, height)))
        }
        animSpriteInfo[singleMovement] = animSheetArr
    }
    animSpriteInfo["spriteObj"] = new PIXI.AnimatedSprite(animSpriteInfo["moveup"])
    animSpriteInfo["spriteObj"].animationSpeed = json["init_state"]["anim_speed"]
    animSpriteInfo["moveState"] = []
    initState(animSpriteInfo["spriteObj"], json)
    applyRes(animSpriteInfo, func)
}