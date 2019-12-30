// pages/tabBar/look/look.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey:'1',
    lookData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lookData: app.globalData.goodsArr,
    });
  },

  tabChange(e) {
    this.setData({
      activeKey: e.detail.value.key
    })
  },

  // 去详情页
  goDetail(e) {
    wx.navigateTo({
      url: `../../detail/detail?id=${e.currentTarget.dataset.id}`,
    });
  },

  // 转发
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.dictData['companyName'],
      path: `/pages/tabBar/index/index`
    };
  },
});