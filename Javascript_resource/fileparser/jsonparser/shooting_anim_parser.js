import * as PIXI from "../../../JS/pixi.js"
import * as app from "../../../application/main.js"
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

function applyAnim(spriteObj, json){
    gsap.to(spriteObj,{
        startAt:{
            x:json["init_state"]["start_point"]["x"],
            y:json["init_state"]["start_point"]["y"],
            pixi:{
                rotation: json["init_state"]["angle"],
                scale: json["init_state"]["scale"]
            },
        },
        x:json["transform_info"]["end_point"]["x"],
        y:json["transform_info"]["end_point"]["y"],
        pixi:{
            rotation: json["transform_info"]["angle"],
            scale: json["transform_info"]["scale"]
        },
        duration:json["transform_info"]["anim_ctrl"]["duration"],
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
    let spriteObj = new PIXI.Sprite(spriteTexture)
    applyAnim(spriteObj, json)
    applyRes(spriteObj, func)
}