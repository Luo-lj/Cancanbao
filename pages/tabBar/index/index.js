// pages/splb/splb.js
const {
  checkToken,
  getBanner,
  goods,
  getValues
} = require('../../../utils/apiData.js');
const {
  login
} = require('../../../utils/login.js');
const common = require('../../../utils/common.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [], // banner列表
    recommendData: [], // 推荐商品数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.globalData.userInfo = null;
    this.initData();
  },

  // 获取初始化数据
  initData() {
    Promise.all([getBanner(), goods(), goods({
      recommendStatus: 1
    }), getValues()]).then(res => {
      app.globalData.goodsData = this.getData(res[1]);
      app.globalData.goodsArr = res[1]; // 所有商品列表
      app.globalData.recommendData = res[2]; // 推荐商品列表
      console.log('Promise.all ===>>>', res);
      console.log('所有商品列表', app.globalData.goodsData);
      this.setData({
        bannerData: res[0],
        recommendData: res[2],
      });
    });
  },


  getData(data) {
    const Codemap = new Map();
    for (let item of data) {
      let Arr = [];
      if (Codemap.has(item.categoryId)) {
        Arr = Codemap.get(item.categoryId);
      }
      Arr.push(item);
      Codemap.set(item.categoryId, Arr); // 添加新的key: code
    }
    return Codemap;
  },

  // banner点击事件
  swiperItem(e) {
    wx.navigateTo({
      url: '../../list/list?id=' + e.currentTarget.id,
    });
  },

  // 设计师
  designerTap() {
    common.showModal('计划于2020年1月份上线，给你带来不便，深感抱歉。');
  },

  // 去详情页
  goDetail(e) {
    wx.navigateTo({
      url: `../../detail/detail?id=${e.currentTarget.dataset.id}`,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!app.globalData.userInfo) {
      login();
    } else {
      checkToken({
        token: app.globalData.userInfo.token
      }).then(res => {
        console.log('检测登录token是否有效', res);
        console.log('判断==》》', res && res.code == 2000);
        if (res && res.code == 2000) {
          login();
        }
      });
    }
  },
});