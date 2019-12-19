// pages/splb/splb.js
import {
  checkToken,
  getBanner,
  goods,
  getValues
} from '../../../utils/apiData.js';
const {
  login
} = require('../../../utils/login.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [],
    productData: [
        {
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
      }
    ],
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
    Promise.all([getBanner(), goods({ recommendStatus: 0 }), goods({recommendStatus: 1}),getValues()]).then(res => {
      app.globalData.goodsData = this.getData(res[1]);
      app.globalData.recommendData = this.getData(res[2]);
      console.log("Promise.all ===>>>", res)
      console.log('所有商品列表', app.globalData.goodsData);
      this.setData({
        bannerData: res[0],
        list: res[1],
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

  onTabsChange(e) {
    console.log('onTabsChange', e);
    const {
      key
    } = e.detail;
    const index = this.data.tabs.map((n) => n.key).indexOf(key);

    this.setData({
      key,
      index,
    });
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e);
    const {
      current: index,
      source
    } = e.detail;
    const {
      key
    } = this.data.tabs[index];

    if (source) {
      this.setData({
        key,
        index,
      });
    }
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
        console.log("检测登录token是否有效", res,)
        console.log("判断==》》", res && res.code == 2000, )
        if (res && res.code == 2000) {
          login();
        }
      })
    }
  },
});