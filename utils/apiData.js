const ljRequest = require('./request.js');

/**
 * 获取商品列表
 */
function goods(){
  return ljRequest.request('/shop/goods/list');
}

/**
 * 获取商品类别
 */
function categoryAll(token){
  return ljRequest.request('/shop/goods/category/all', { token })
}

module.exports = {
  categoryAll,
  goods
}