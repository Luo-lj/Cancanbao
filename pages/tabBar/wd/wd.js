// pages/tabBar/wd/wd.js
const app = getApp();
const {
  // register,
  Login,
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
    console.log(app.globalData.userInfo, '<<<===globalData');

  },

  onGotUserInfo(e) {
    console.log(e, '<<<<<<<<<<<<<<????');
  },

  // 获取用户信息
  getUserInfo() {
    wx.login({
      success(res) {
        if (res.code) {
          Login(res.code).then(res => {
            console.log('111111', res);
          });
        }
      }
    });
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!app.globalData.userInfo) {
      login().then(() => {
        console.log('000000000000', app.globalData.userInfo);
      });
    } else {
      this.setData({
        userInfo: app.globalData.userInfo
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
  }


});