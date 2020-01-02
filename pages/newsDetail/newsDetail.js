// pages/newsDetail/newsDetail.js
const {
  newsDetail,
} = require('../../utils/apiData.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    newsDetail({id:options.id}).then(res => {
      console.log("文章详情", res)
      this.setData({
        news:res
      })
    })
  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})