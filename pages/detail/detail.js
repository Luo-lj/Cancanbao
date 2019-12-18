// pages/detail/detail.js
import {
  detail,
} from '../../utils/apiData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    detailData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '分享点进来的  ----  detail');
    detail({ id: options.id }).then(res => {
      console.log('获取商品详情', res);
      this.setData({
        id: options.id,
        detailData: res
      });
    });
  },

  onShareAppMessage: function (res) {
    console.log(res.from, 'button：页面内转发按钮； menu：右上角转发菜单');
    return {
      title: this.data.detailData.basicInfo.name,
      path: `/pages/detail/detail?id=${this.data.id}`
    };
  },

});