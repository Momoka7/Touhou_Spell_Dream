/**
 * 游戏主要脚本处理
 * 流程:    1.创建PIXI实例app
 *          2.创建若干个容器Container
 *          3.创建若干个Sprites
 *          4.将Sprites分组加入容器
 *          5.读取配置文件
 *          6.添加键盘处理逻辑
 *          7.添加Sprites动画效果
 *          
 */
let app;
let player;
window.onload = function(){
    app=initAndGetPixiApp(800,600,0x66CCFF,"#pixiDiv");//初始化并获取app实例
}
