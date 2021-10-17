/**
 * 初始化各种参数
 */

function initAndGetPixiApp(w,h,bgc,selector) {
    let app = new PIXI.Application(
        {
            width: w,
            height: h,
            backgroundColor: bgc
        }
    )
    app.ticker.add(gameloop);//添加游戏循环
    document.querySelector(selector).appendChild(app.view);//加入画布到dom中
    return app;
}

function gameloop(delta) {

}