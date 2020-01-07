// pages/tabBar/look/look.js
const app = getApp();
const {
  newsList,
  userModify
} = require('../../../utils/apiData.js');
const Event = require('../../../components/utils/events.js');
const common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: '1',
    articleData: [], // 文章列表
    lookData: [],
    epicureData: [], // 美食家数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.jsonList);
    newsList().then(res => {
      console.log('获取文章列表', res);
      this.setData({
        articleData: res,
        lookData: app.globalData.goodsArr,
        epicureData: app.globalData.jsonList['10001'],
      });
      Event.dispatch('g-tabs-resetStyle');
    });
  },

  // tab切换
  tabChange(e) {
    this.setData({
      activeKey: e.detail.value.key
    });
  },

  // 关注
  followTap(e){
    console.log("===>>>", e)
    if (app.globalData.userInfo.base.nick){
      app.globalData.userInfo.ext.follow.push(e.currentTarget.dataset.item);
      let obj = {
        avatarUrl: app.globalData.userInfo.base.avatarUrl, // 头像图片地址
        city: app.globalData.userInfo.base.city, // 所在城市
        nick: app.globalData.userInfo.base.nick, // 昵称
        province: app.globalData.userInfo.base.province, // 所在省份,
        extJsonStr: JSON.stringify(app.globalData.userInfo.ext), // 扩展数据
        token: app.globalData.userInfo.token,
      };
      userModify(obj).then(res => {
        this.setData({
          userInfo: app.globalData.userInfo
        });
      });
    }else{
      common.showModal('您没有授权登录，请先登录。', '温馨提示', '授权登录','取消').then(res => {
        if(res){
          console.log("授权登录逻辑")
          wx.switchTab({
            url: '../wd/wd'
          })
        }
      })
    }
  },

  // 去文章详情
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