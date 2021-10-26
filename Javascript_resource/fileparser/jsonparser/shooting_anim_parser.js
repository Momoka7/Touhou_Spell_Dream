import * as PIXI from "../../../JS/pixi.js"
import * as app from "../../../application/main.js"
import {functionMap} from "../../spell/style.js"
import {gsap} from "../../../src/index.js";
// import * as shooting from "../../../asserts/shootings/one_shoot.js"


var loader
/**
 * 输入解析的弹幕文件路径以及加载完毕后的回调函数
 */
export function parse(name, func){
    let url = "../../../asserts/shootings/"+name+".json"   //暂时硬编码，待更改
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

function applyAnim(spriteObj, json, idx){
    spriteObj.anchor.set(json["init_state"]["anchor"]["x"],json["init_state"]["anchor"]["y"])
    gsap.to(spriteObj,{
        startAt:{
            x:json["init_state"]["start_point"]["x"],
            y:json["init_state"]["start_point"]["y"],
            pixi:{
                rotation: json["init_state"]["angle"]+ idx * json["init_state"]["inter_offset_info"]["inter_angle"],
                scale: json["init_state"]["scale"] + idx * json["init_state"]["inter_offset_info"]["inter_scale"]
            },
        },
        // x:json["transform_info"]["end_point"]["x"],
        // y:json["transform_info"]["end_point"]["y"],
        x:spriteObj.transformX,
        y:spriteObj.transformY,
        pixi:{
            rotation: json["transform_info"]["angle"]+ idx * json["init_state"]["inter_offset_info"]["inter_angle"],
            scale: json["transform_info"]["scale"]+ idx * json["init_state"]["inter_offset_info"]["inter_scale"]
        },
        duration:json["transform_info"]["anim_ctrl"]["duration"],
        delay:idx * json["init_state"]["inter_offset_info"]["inter_time"]
    })
}
/**
 * 应用解析结果，一般为将对象放到画布中
 * @param {所控制的Sprite对象} spriteObj 
 * @param {加载完成后的回调函数}} func 
 */
function applyRes(spriteObj, func){
    app.app.stage.addChild(spriteObj)
    func(spriteObj)
}

function parseImgRes(imgPath, json, func) {
    loader = new PIXI.Loader()
    loader.add(json["extra_info"]["alias"], "../../../asserts/images/"+imgPath).load(function(loader, resources){
        onResLoaded(loader, resources, json, func)
    });
}

function onResLoaded(loader, resources, json, func){
    loader.destroy()
    loader = null
    let sheet = new PIXI.BaseTexture.from(resources[json["extra_info"]["alias"]].url);
    let x = json["extra_info"]["rectangle"]["x"]
    let y = json["extra_info"]["rectangle"]["y"]
    let width = json["extra_info"]["rectangle"]["width"]
    let height = json["extra_info"]["rectangle"]["height"]
    let spriteTexture = new PIXI.Texture(sheet, new PIXI.Rectangle(x, y, width, height))
    let spriteObjs = []
    for(let i = 0;i<json["init_state"]["shoot_num"];i++){
        spriteObjs[i] = new PIXI.Sprite(spriteTexture)
        console.log(spriteObjs[i])
        functionMap[json["init_state"]["style"]["type"]](spriteObjs[i],json,i)
        applyAnim(spriteObjs[i], json, i)
        applyRes(spriteObjs[i], func)
    }
}