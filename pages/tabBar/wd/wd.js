// pages/tabBar/wd/wd.js
const app = getApp();
const {
  userModify,
  userDetail,
  checkToken,
  // setJson,
  // deleteJson
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
    userInfo: {}, //用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    userDetail({
      token: app.globalData.userInfo.token
    }).then(res => {
      console.log('获取用户信息', res, app.globalData.userInfo);
      app.globalData.userInfo.ext = Object.assign(app.globalData.userInfo.ext, res.ext);
      app.globalData.userInfo.base = Object.assign(app.globalData.userInfo.base, res.base);
      this.setData({
        userInfo: app.globalData.userInfo,
      });
      console.log('app.globalData.userInfo===>>>', app.globalData.userInfo);
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!app.globalData.userInfo.token) {
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
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },

  onGotUserInfo: function(e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      const userInfo = e.detail.userInfo;
      app.globalData.userInfo.base = Object.assign(app.globalData.userInfo.base, userInfo);
      let obj = {
        avatarUrl: userInfo.avatarUrl, // 头像图片地址
        city: userInfo.city, // 所在城市
        nick: userInfo.nickName, // 昵称
        province: userInfo.province, // 所在省份,
        token: app.globalData.userInfo.token,
      };
      userModify(obj).then(res => {
        this.setData({
          userInfo: app.globalData.userInfo
        });
      });
    }
  },

  // 编辑资料
  goUserInfo() {
    wx.navigateTo({
      url: '../../userinfo/userinfo',
    });
  },

  /** 收藏 **/
  goShoucan() {
    if (this.data.userInfo.base.nick || this.data.userInfo.base.nickName) {
      wx.navigateTo({
        url: '../../list/list',
      });
    } else {
      common.showModal('请授权登录。');
    }
  },

  // 笑话大全
  goJoke() {
    wx.navigateTo({
      url: '../../joke/joke',
    });
  },

  /** 到店咨询 **/
  goLocation() {
    if (this.data.userInfo.base.nick || this.data.userInfo.base.nickName) {
      wx.navigateTo({
        url: '../../location/location',
      });
    } else {
      common.showModal('请授权登录。');
    }
  },

  /** 联系客服 **/
  contact() {
    if (this.data.userInfo.base.nick || this.data.userInfo.base.nickName) {
      wx.makePhoneCall({
        phoneNumber: app.globalData.dictData['servicePhoneNumber'] // 仅为示例，并非真实的电话号码
      });
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