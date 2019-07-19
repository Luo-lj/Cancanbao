// pages/splb/splb.js
const apiData = require('../../../utils/apiData.js')
const common = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
      imgSrc: '../../images/banner1.jpg',
      id: '01'
    }, {
      imgSrc: '../../images/banner1.jpg',
      id: '02'
    }, {
      imgSrc: '../../images/banner1.jpg',
      id: '03'
    }],
    tabs: [
      {
        key: 'tab1',
        title: 'Tab 1',
        content: 'Content of tab 1',
      },
      {
        key: 'tab2',
        title: 'Tab 2',
        content: 'Content of tab 2',
      },
      {
        key: 'tab3',
        title: 'Tab 3',
        content: 'Content of tab 3',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    apiData.goods().then(res => {
      console.log(res, "获取商品列表")
      this.setData({
        list: res,
      })
    })
    apiData.categoryAll().then(res => {
      console.log(res, "<<<<<<<<<<<<<<<")
    })
  },

  //banner点击事件
  swiperItem(e) {
    wx.navigateTo({
      url: '../list/list?id=' + e.currentTarget.id,
    })
  },

  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
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
})