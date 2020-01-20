// pages/epicure/epicure.js
const app = getApp();
const {
  userModify
} = require('../../utils/apiData.js');
const common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    epicureData: {},
    lookData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const jsonList = app.globalData.pageInfo['jsonList'];
    const epicureData = jsonList.find(item => item.epicureId == options.epicureId);
    this.setData({
      epicureData,
      lookData: app.globalData.goodsArr,
    });

  },

  // 关注
  followTap(e) {
    if (app.globalData.userInfo.base.nick || app.globalData.userInfo.base.nickName) {
      let obj = {
        avatarUrl: app.globalData.userInfo.base.avatarUrl, // 头像图片地址
        city: app.globalData.userInfo.base.city, // 所在城市
        nick: app.globalData.userInfo.base.nick, // 昵称
        province: app.globalData.userInfo.base.province, // 所在省份,
        token: app.globalData.userInfo.token,
      };
      if (this.data.epicureData.isFollow) {
        this.data.epicureData.isFollow = false;
        let followIndex = app.globalData.userInfo.ext.follow.findIndex(i => i.epicureId == this.data.epicureData.epicureId);
        app.globalData.userInfo.ext.follow.splice(followIndex, 1);
        obj.extJsonStr = JSON.stringify(app.globalData.userInfo.ext); // 扩展数据
      } else {
        this.data.epicureData.isFollow = true;
        app.globalData.userInfo.ext.follow.push(this.data.epicureData);
        obj.extJsonStr = JSON.stringify(app.globalData.userInfo.ext); // 扩展数据
      }
      userModify(obj).then(res => {
        this.setData({
          epicureData: this.data.epicureData,
        });
      });

    } else {
      common.showModal('您没有授权登录，请先登录。', '温馨提示', '授权登录', '取消').then(res => {
        if (res) {
          wx.switchTab({
            url: '../tabBar/wd/wd'
          });
        }
      });
    }
  },

  // 去详情页
  goDetail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    });
  },


});