/**
 * 用于处理Sprites的加载等处理
 */
/**
 * 
 * @param {要加载的图片路径} path 
 * @param {加载的资源别名} name 
 * @param {加载完成的回调函数} setUp 
 */
function loadTexture(path,name,setUp){
    let loader=PIXI.Loader.shared;
    loader.add(name, path).load(setUp);
    return loader;
}
