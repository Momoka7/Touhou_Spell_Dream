import {app} from "../../application/main.js"

function detectIntersection(container1, container2) {
    let bound1 = container1.getBounds()
    let bound2 = container2.getBounds()
    var graph2CenterX = bound2.x + bound2.width / 2,
        graph2CenterY = bound2.y + bound2.height / 2,
        graphCenterX = bound1.x + bound1.width / 2,
        graphCenterY = bound1.y + bound1.height / 2;

    // 加上 = 就是相切
    if ((Math.abs(graph2CenterX - graphCenterX) < bound1.width / 2 + bound2.width / 2) &&
        Math.abs(graph2CenterY - graphCenterY) < bound1.height / 2 + bound2.height / 2) {
        return true
    } else {
        return false
    }
}

function getIntersectionRect(container1, container2) {
    let bound1 = container1.getBounds()
    let bound2 = container2.getBounds()
    var graphRight = bound1.x + bound1.width,
        graphBottom = bound1.y + bound1.height,
        graph2Right = bound2.x + bound2.width,
        graph2Bottom = bound2.y + bound2.height;

    var rect3Left = Math.max(bound1.x, bound2.x),
        rect3Top = Math.max(bound1.y, bound2.y),
        rect3Right = Math.min(graphRight, graph2Right),
        rect3Bottom = Math.min(graphBottom, graph2Bottom);

    return {
        left: rect3Left,
        top: rect3Top,
        width: rect3Right - rect3Left,
        height: rect3Bottom - rect3Top
    }
}

function handleEgdeCollisions(container1, container2,rect) {
    let bound1 = container1.getBounds()
    let bound2 = container2.getBounds()
    let imgData1Data = app.renderer.plugins.extract.canvas(container1).getContext('2d').getImageData(rect.left - bound1.x, rect.top - bound1.y, Math.ceil(rect.width), Math.ceil(rect.height))
    let imgData2Data = app.renderer.plugins.extract.canvas(container2).getContext('2d').getImageData(rect.left - bound2.x, rect.top - bound2.y, Math.ceil(rect.width), Math.ceil(rect.height))
    for (let i = 3; i < imgData1Data.data.length; i += 4) {
        if (imgData1Data.data[i] > 0 && imgData2Data.data[i] > 0) {
            console.log('撞了')
            return true
        }
    }
    return false
}

function loopingDetect(container1, container2) {
    if (detectIntersection(container1, container2)) {
        let intersectionRect = getIntersectionRect(container1, container2)
        handleEgdeCollisions(container1, container2,intersectionRect)
    }
}

export {loopingDetect}