// pages/tabBar/wd/wd.js
const app = getApp();
const {
  userModify,
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
  onLoad: function(options) {},

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
        if (res && res.code == 2000) {
          login();
        }
      });
    }
  },

  onGotUserInfo: function(e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      const userInfo = e.detail.userInfo;
      app.globalData.userInfo = Object.assign(app.globalData.userInfo, userInfo);
      let obj = {
        avatarUrl: userInfo.avatarUrl, // 头像图片地址
        city: userInfo.city, // 所在城市
        nick: userInfo.nickName, // 昵称
        province: userInfo.province, // 所在省份,
        extJsonStr: {}, // 扩展数据
        token: app.globalData.userInfo.token,
      };
      userModify(obj).then(res => {
        this.setData({
          userInfo: app.globalData.userInfo
        });
      });
    }
  },

  /** 收藏 **/
  goShoucan() {
    if (this.data.userInfo.nickName) {
      wx.navigateTo({
        url: '../../list/list',
      });
    } else {
      common.showModal('请授权登录。');
    }
  },

  /** 到店咨询 **/
  goLocation() {
    if (this.data.userInfo.nickName) {
      wx.navigateTo({
        url: '../../location/location',
      });
    } else {
      common.showModal('请授权登录。');
    }
  },

  /** 联系客服 **/
  contact() {
    if (this.data.userInfo.nickName) {
      wx.makePhoneCall({
        phoneNumber: app.globalData.dictData['servicePhoneNumber'] //仅为示例，并非真实的电话号码
      })
    } else {
      common.showModal('请授权登录。');
    }
  },

  /** 关于我们 **/
  aboutUs() {
    common.showModal(app.globalData.dictData['aboutUsContent'], app.globalData.dictData['aboutUsTitle']);
  },

  // 转发
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.dictData['companyName'],
      path: `/pages/tabBar/index/index`
    };
  },
});