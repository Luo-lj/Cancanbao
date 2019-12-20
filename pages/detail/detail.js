// pages/detail/detail.js
import {
  detail,
  collect,
  collectCheck,
  collectDelete,
} from '../../utils/apiData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    console.log(options, '分享点进来的  ----  detail');
    detail({
      id: options.id
    }).then(res => {
      console.log('获取商品详情', res);
      let content = res.content.replace(/<\/?.+?>/g, '');
      const goodsId = res.pics[0].goodsId;
      collectCheck({
        goodsId,
        token: app.globalData.userInfo.token
      }).then(re => {
        console.log('是否已经收藏', re);
        if (re != '已收藏') {
          this.data.isShoucan = false;
        } else {
          this.data.isShoucan = true;
        }
        this.setData({
          id: options.id,
          goodsId,
          isShoucan: this.data.isShoucan,
          detailData: res,
          content
        });
      });

    });
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
      obj.id = this.data.id;
      collectDelete(obj).then(res => {
        console.log('删除商品收藏', res);
        this.setData({
          isShoucan: false,
        });
      });
    } else {
      delete obj.id;
      collect(obj).then(res => {
        console.log('收藏商品', res);
        this.setData({
          isShoucan: true,
        });
      });
    }
  },

  // 转发
  onShareAppMessage: function(res) {
    console.log(res.from, 'button：页面内转发按钮； menu：右上角转发菜单');
    return {
      title: this.data.detailData.basicInfo.name,
      path: `/pages/detail/detail?id=${this.data.id}`
    };
  },


  /** 联系客服 **/
  contact() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.dictData['servicePhoneNumber'] // 仅为示例，并非真实的电话号码
    });
  },

});