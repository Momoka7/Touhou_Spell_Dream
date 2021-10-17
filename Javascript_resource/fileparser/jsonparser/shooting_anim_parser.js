import * as PIXI from "../../../JS/pixi.js"
import * as app from "../../../application/main.js"
import {gsap} from "../../../src/index.js";
// import * as shooting from "../../../asserts/shootings/one_shoot.js"
/**
 * 输入解析的弹幕文件路径以及加载完毕后的回调函数
 */
export function parse(name, func){
    let url = "../../../asserts/shootings/one_shoot.json"
    let request = new XMLHttpRequest()
    request.open("get", url)
    request.send(null)
    request.onload = function () {
        if(request.status == 200){
            let json = JSON.parse(request.responseText)
            let spriteObj = getImgRes(json["extra_info"]["assert_path"])
            applyAnim(spriteObj, json)
            applyRes(spriteObj, func)
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

function getImgRes(imgPath) {
    console.log(imgPath)
    return new PIXI.Sprite.from("../../../asserts/images/"+imgPath)
}