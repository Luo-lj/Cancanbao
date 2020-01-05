// pages/tabBar/look/look.js
const app = getApp();
const {
  newsList
} = require('../../../utils/apiData.js');
const Event = require('../../../components/utils/events.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: '1',
    articleData: [], //文章列表
    lookData: [],
    epicureData: [], //美食家数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.jsonList)
    newsList().then(res => {
      console.log("获取文章列表", res)
      this.setData({
        articleData: res,
        lookData: app.globalData.goodsArr,
        epicureData: app.globalData.jsonList[1].jsonData.data,
      });
      Event.dispatch('g-tabs-resetStyle');
    })

    this.ceShiApi();
  },

  ceShiApi() {
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index', //仅为示例，并非真实的接口地址
      data: {
        type: 'top',
        key: '478c162f513be6566d51e800d15f8076'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },

  //tab切换
  tabChange(e) {
    this.setData({
      activeKey: e.detail.value.key
    })
  },

  //去文章详情
  goNewsDetail(e) {
    wx.navigateTo({
      url: `../../newsDetail/newsDetail?id=${e.currentTarget.dataset.id}`,
    });
  },

  // 去详情页
  goDetail(e) {
    wx.navigateTo({
      url: `../../detail/detail?id=${e.currentTarget.dataset.id}`,
    });
  },

  // 转发
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.dictData['companyName'],
      path: `/pages/tabBar/index/index`
    };
  },
});