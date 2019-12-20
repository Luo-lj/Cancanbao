// pages/tabBar/wd/wd.js
const app = getApp();
const {
  checkToken
} = require('../../../utils/apiData.js');
const {
  login
} = require('../../../utils/login.js');
const common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!app.globalData.userInfo) {
      login();
    } else {
      checkToken({
        token: app.globalData.userInfo.token
      }).then(res => {
        console.log('检测登录token是否有效', res);
        console.log('判断==》》', res && res.code == 2000);
        if (res && res.code == 2000) {
          login();
        }
      });
    }
  },

  /** 到店咨询 **/
  goLocation() {
    wx.navigateTo({
      url: '../../location/location',
    });
  },

  /** 联系客服 **/
  contact() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.dictData['servicePhoneNumber'] // 仅为示例，并非真实的电话号码
    });
  },

  /** 关于我们 **/
  aboutUs() {
    common.showModal(app.globalData.dictData['aboutUsContent'], app.globalData.dictData['aboutUsTitle']);
  },

});