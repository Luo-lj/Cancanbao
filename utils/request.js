const config = require('./config.js');
const common = require('./common.js')

/**
 * @param {String} url: 请求路径
 * @param {Object} params: 请求数据json格式对象
 * @param {String} method: 请求方式 默认POST
 * @param {boolean | 1 } errHandle: 值为true弹出提示信息；值为false则需处理异常；值为1弹出提示信息并返回上页;
 * @param {Object} header: 请求头 application/x-www-form-urlencoded 或 application/json
 */
function request(url, params, method = 'POST', errHandle = true, urlPrex = true, header = {
  'Content-Type': 'application/x-www-form-urlencoded'
}) {
  common.showLoading();
  console.log("请求参数===>>>", Object.assign({}, params))
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.apiUrl}/${urlPrex?config.myUrl:''}${url}`,
      method,
      data: Object.assign({}, params),
      dataType: 'json',
      header,
      success(res) {
        if (res.data.code == '0') {
          resolve(res.data.data);
        } else {
          const msg = res.data.msg;
          if (errHandle) {
            if (errHandle === 1) {
              common.showErrorMsg(msg, true, true)
            } else {
              common.showErrorMsg(msg)
            }
          }
          resolve(res.data)
        }
      },
      fail(err) {
        common.showErrorMsg('服务器忙!给你带来不便,很抱歉！请您稍候再重试...')
        reject(err)
      },
      complete() {
        wx.hideLoading();
      },
    })
  })
}

module.exports = {
  request,
}