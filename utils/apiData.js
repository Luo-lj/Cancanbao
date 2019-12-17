const ljRequest = require('./request.js');
const config = require('./config.js');
const app = getApp();
/**
 * 用户注册
 * @param {Object} obj {code} 微信登录接口返回的 code
 * @param {boolean | 1 } errHandle: 值为true弹出提示信息；值为false则抛出异常；值为1弹出提示信息并返回上页;
 */
function register(obj, errHandle) {
  return ljRequest.request('/user/wxapp/register/simple', obj, '', errHandle);
}

/**
 * 登录获取Token
 */
function Login(obj, errHandle) {
  return ljRequest.request('/user/wxapp/login', obj, '', errHandle);
}

/**
 * 获取banner列表
 */
function getBanner() {
  return ljRequest.request('/banner/list', '', 'GET');
}


/**
 * 获取商品列表
 */
function goods() {
  return ljRequest.request('/shop/goods/list', '', '', 1);
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
 * 批量获取系统参数
 * @param {Array} keys: 参数  { keys:'servicePhoneNumber,aboutUsTitle, aboutUsContent'}
 * @return 
 */
function getValues() {
  const keys = {
    keys: config.dictKeys.join(',')
  }
  return new Promise(resolev => {
    ljRequest.request('/config/values', keys, 'GET').then(res => {
      let list = {}
      for (let item of res) {
        list[item.key] = item.value;
      }
      app.globalData.dictData = list;
      resolev(true)
    })
  })
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
function create(obj) {
  console.log(obj, "????????????????")
  return ljRequest.request('/order/create', obj)
}

module.exports = {
  register,
  Login,
  getBanner,
  categoryAll,
  goods,
  getValues,
  wxappPay,
  create
}