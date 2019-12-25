const app = getApp();
const {
  register,
  Login
} = require('./apiData.js');

//登录
function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          Login({
            code: res.code,
            token: '',
            type: '2'
          }, false).then(res => {
            if (res.code == 10000) {
              userRegister();
            } else {
              app.globalData.userInfo = res;
              resolve()
            }
          })
        }
      }
    })
  })
}

//注册
function userRegister() {
  wx.login({
    success(res) {
      if (res.code) {
        register({
          code: res.code
        }, false).then(res => {
          login();
        })
      }
    }
  })
}

module.exports = {
  login,
}