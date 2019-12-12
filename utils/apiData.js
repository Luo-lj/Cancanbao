const ljRequest = require('./request.js');

/**
 * 用户注册
 */
function register(obj) {
  return ljRequest.request('/user/wxapp/register/simple', obj);
}

/**
 * 登录获取Token
 */
function Login(obj) {
  return ljRequest.request('/user/wxapp/login', obj);
}

/**
 * 获取商品列表
 */
function goods() {
  return ljRequest.request('/shop/goods/list');
}

/**
 * 获取商品类别
 */
function categoryAll(token) {
  return ljRequest.request('/shop/goods/category/all', {
    token
  })
}

/**
 * 获取系统参数
 */
function getValue(key) {
  return ljRequest.request('/config/value', {
    key
  }, 'GET')
}

/**
 * 批量获取系统参数
 * @param {Array} keys: 参数
 * @return 
 */
function getValues(keys) {
  return ljRequest.request('/config/values', {
    keys
  }, 'GET')
}

/**
 * 小程序支付
 * @param {Array} keys: 参数
 * @return 
 */
function wxappPay(obj) {
  return ljRequest.request('/pay/wx/wxapp', obj, 'GET')
}

/**
 * 创建订单
 */
function create(obj){
  console.log(obj, "????????????????")
  return ljRequest.request('/order/create', obj)
}

module.exports = {
  register,
  Login,
  categoryAll,
  goods,
  getValue,
  getValues,
  wxappPay,
  create
}