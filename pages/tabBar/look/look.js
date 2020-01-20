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
    jsonList: [], // 美食家数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    newsList().then(res => {
      this.setData({
        articleData: res,
        lookData: app.globalData.goodsArr,
        jsonList: app.globalData.pageInfo['jsonList'],
      });
      Event.dispatch('g-tabs-resetStyle');
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('===>>>关注的数据', app.globalData.userInfo.ext.follow);
    console.log('===>>>美食家数据', app.globalData.pageInfo, app.globalData.pageInfo['jsonList']);

    let follow = app.globalData.userInfo.ext.follow;
    let jsonList = app.globalData.pageInfo['jsonList'];
    for (let jsonItem of jsonList) {
      if (follow.length) {
        for (let item of follow) {
          if (item.epicureId == jsonItem.epicureId && !jsonItem.isFollow) {
            jsonItem.isFollow = true;
          }
        }
      } else {
        jsonItem.isFollow = false;
      }
    }
    this.setData({
      jsonList
    });
  },

  // tab切换
  tabChange(e) {
    this.setData({
      activeKey: e.detail.value.key
    });
  },

  // 关注
  followTap(e) {
    if (app.globalData.userInfo.base.nick || app.globalData.userInfo.base.nickName) {
      const item = e.currentTarget.dataset.item;
      let obj = {
        avatarUrl: app.globalData.userInfo.base.avatarUrl, // 头像图片地址
        city: app.globalData.userInfo.base.city, // 所在城市
        nick: app.globalData.userInfo.base.nick, // 昵称
        province: app.globalData.userInfo.base.province, // 所在省份,
        token: app.globalData.userInfo.token,
      };
      let index = this.data.jsonList.findIndex(i => i.epicureId == item.epicureId); // 当前点击的下标
      if (item.isFollow) {
        this.data.jsonList[index].isFollow = false;

        let followIndex = app.globalData.userInfo.ext.follow.findIndex(i => i.epicureId == item.epicureId);
        app.globalData.userInfo.ext.follow.splice(followIndex, 1);
        obj.extJsonStr = JSON.stringify(app.globalData.userInfo.ext); // 扩展数据
      } else {
        this.data.jsonList[index].isFollow = true;
        app.globalData.userInfo.ext.follow.push(item);
        obj.extJsonStr = JSON.stringify(app.globalData.userInfo.ext); // 扩展数据
      }
      userModify(obj).then(res => {
        this.setData({
          userInfo: app.globalData.userInfo,
          jsonList: this.data.jsonList,
        });
      });

    } else {
      common.showModal('您没有授权登录，请先登录。', '温馨提示', '授权登录', '取消').then(res => {
        if (res) {
          wx.switchTab({
            url: '../wd/wd'
          });
        }
      });
    }
  },

  // 去美食家主页
  goEpicure(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `../../epicure/epicure?epicureId=${item.epicureId}`,
    });
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