// pages/splb/splb.js
// const apiData = require('../../../utils/apiData.js')
import {
  getBanner,
  goods,
  categoryAll
} from '../../../utils/apiData.js'
const common = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [],
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
    }],
    categoryAll: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData();
  },

  //获取初始化数据
  initData() {
    Promise.all([getBanner(), goods(), categoryAll()]).then(res => {
      console.log("完成了", res)
      this.setData({
        bannerData: res[0],
        list: res[1],
        categoryAll: res[2]
      })
    })
  },

  //banner点击事件
  swiperItem(e) {
    wx.navigateTo({
      url: '../../list/list?id=' + e.currentTarget.id,
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
    console.log("onReady----生命周期函数--监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
})