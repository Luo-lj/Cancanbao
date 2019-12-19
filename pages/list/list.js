// pages/list/list.js
import {
  collectList,
} from '../../utils/apiData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyData: [],//收藏列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let obj = {
      nameLike: '', // 商品标题模糊搜索关键词
      page: '', // 获取第几页数据
      pageSize: '', // 每页显示多少数据
      token: app.globalData.userInfo.token, // 登录接口返回的token
    };
    collectList(obj).then(res => {
      console.log('收藏列表====》》》》', res);
      this.setData({
        historyData: res,
      })
    });
  },

  /**
 * 查看详情页面信息
 */
  getDetail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    });
  },
});