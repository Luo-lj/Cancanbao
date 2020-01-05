// pages/detail/detail.js
const {
  detail,
  collect,
  collectCheck,
  collectDelete,
  collectList,
} = require('../../utils/apiData.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOk: false,
    isShow:false,//是否展示全部材料
    windowHeight: null,
    id: null,
    goodsId: '', // 商品的goodsId
    isShoucan: false, // 当前商品是否收藏
    detailData: {},
    content: '', // 详细内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const windowHeight = wx.getSystemInfoSync().windowHeight; // 获取屏幕的高度
    detail({
      id: options.id
    }).then(res => {
      let content = res.content;
      const goodsId = res.pics[0].goodsId;
      wx.setNavigationBarTitle({
        title: res.basicInfo.name
      });
      collectCheck({
        goodsId,
        token: app.globalData.userInfo.token
      }).then(re => {
        if (re != '已收藏') {
          this.data.isShoucan = false;
        } else {
          this.data.isShoucan = true;
        }

        res.extJson = JSON.stringify(res.extJson) == '{}' ? false : res.extJson;
        res.content = res.content.replace(/\<img/g, '<img style="margin:0 auto;display:block;"')
        this.setData({
          isOk: true,
          windowHeight,
          id: options.id,
          goodsId,
          isShoucan: this.data.isShoucan,
          detailData: res,
          content
        });
      });

    });
  },

  //是否展示全部材料
  openTips(){
    this.setData({
      isShow: !this.data.isShow,
    })
  },

  /**
   * 收藏
   */
  shoucanTap() {
    let obj = {
      goodsId: this.data.goodsId,
      token: app.globalData.userInfo.token
    };
    if (this.data.isShoucan) {
      this.getCollectId().then(res => {
        obj.id = res;
        collectDelete(obj).then(() => {
          this.setData({
            isShoucan: false,
          });
        });
      });
    } else {
      delete obj.id;
      collect(obj).then(res => {
        this.setData({
          isShoucan: true,
        });
      });
    }
  },

  // 取消收藏得先调收藏列表获取收藏记录id
  getCollectId() {
    return new Promise(resolve => {
      let obj = {
        nameLike: '', // 商品标题模糊搜索关键词
        page: '', // 获取第几页数据
        pageSize: '', // 每页显示多少数据
        token: app.globalData.userInfo.token, // 登录接口返回的token
      };
      collectList(obj).then(res => {
        const item = res.find(item => item.goodsId == this.data.id);
        resolve(item.id);
      });
    });
  },

  // 转发
  onShareAppMessage: function(res) {
    return {
      title: this.data.detailData.basicInfo.name,
      path: `/pages/detail/detail?id=${this.data.id}`
    };
  },

});