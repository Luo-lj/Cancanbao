// pages/tabBar/fl/fl.js
import {
  categoryAll,
} from '../../../utils/apiData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 81671, // 当前选中的id
    categoryAll: [], // 所有类别
    goodslist: [], // 商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    categoryAll().then(res => {
      console.log(res, '???????????');
      this.setData({
        categoryAll: res,
      });
    });
  },

  /**
   * 选择商品
   */
  selectGoods(e) {
    console.log('===>>>', e);
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
});