var functionMap={
    "all_circle":allCircle
}

function allCircle(spriteObj,json,idx) {
    let circleData = json["init_state"]["style"]
    let inter_angle = 360/json["init_state"]["shoot_num"]
    spriteObj.transformX=circleData["center_pos"]["x"]+Math.sin(inter_angle*idx)*circleData["radius"]
    spriteObj.transformY=circleData["center_pos"]["y"]+Math.cos(inter_angle*idx)*circleData["radius"]
}

export {functionMap}