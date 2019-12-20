// pages/tabBar/fl/fl.js
const {
  categoryAll,
} = require('../../../utils/apiData.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOk: false,
    windowHeight: '', // 获取屏幕的高度
    id: null, // 当前选中的id
    categoryAll: [], // 所有类别
    goodslist: [], // 商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.windowHeight = wx.getSystemInfoSync().windowHeight; // 获取屏幕的高度
    categoryAll().then(res => {
      this.setData({
        isOk: true,
        windowHeight: this.data.windowHeight,
        id: 81671,
        goodslist: app.globalData.goodsData.get(81671),
        categoryAll: res,
      });
    });
  },

  /**
   * 选择商品
   */
  selectGoods(e) {
    const id = e.currentTarget.dataset.id;
    const goodslist = app.globalData.goodsData.get(id) || [];
    this.setData({
      id,
      goodslist
    });
  },

  /**
   * 查看详情页面信息
   */
  getDetail(e) {
    wx.navigateTo({
      url: `../../detail/detail?id=${e.currentTarget.dataset.id}`,
    });
  },
});