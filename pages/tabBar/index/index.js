// pages/splb/splb.js
const apiData = require('../../../utils/apiData.js')
const common = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
      imgSrc: '../../../images/banner1.jpg',
      id: '01'
    }, {
      imgSrc: '../../../images/banner2.jpg',
      id: '02'
    }, {
      imgSrc: '../../../images/banner3.jpg',
      id: '03'
    }, {
      imgSrc: '../../../images/banner4.jpg',
      id: '04'
    }],
    productData: [{
      imgSrc: '/images/product/product-1.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-2.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-3.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-4.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-5.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-6.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-1.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-2.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-3.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-4.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-5.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }, {
      imgSrc: '/images/product/product-6.jpg',
      name: '极简主义',
      tips: '中式 | 3室 | 140平方',
      shoucan: false,
    }]

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
    const {
      key
    } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      key,
      index,
    })
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const {
      current: index,
      source
    } = e.detail
    const {
      key
    } = this.data.tabs[index]

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