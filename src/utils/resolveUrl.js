/**
 * 别名 图片路径
 * @param {*} url 
 * @returns 
 */
const getImageUrl = function (url) {
  return new URL(url.replace('@', '/src'), import.meta.url).href;
}

export { getImageUrl }