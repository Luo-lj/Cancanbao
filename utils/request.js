const config = require('./config.js');

/**
 * @param {String} url: 请求路径
 * @param {Object} params: 请求数据json格式对象
 * @param {String} method: 请求方式 默认POST
 * @param {Object} header: 请求头 application/x-www-form-urlencoded 或 application/json
 */
function request(url, params, method = 'POST', header = {
  'Content-Type': 'application/x-www-form-urlencoded'
}) {
  wx.showLoading({
    title: '加载中...',
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.apiUrl}/${config.myUrl}${url}`,
      method,
      data: Object.assign({}, params),
      dataType: 'json',
      header,
      success(res) {
        console.log("返回参数>>>", res);
        if (res.data.code == '0') {
          resolve(res.data.data);
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message || "请求错误"
          })
        }
      },
      fail(err) {
        reject(err)
      },
      complete() {
        wx.hideLoading();
      },
    })
  })
}

module.exports = {
  request
}