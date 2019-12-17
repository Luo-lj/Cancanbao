// pages/location/location.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '', // 地图中心纬度
    longitude: '', // 地图中心经度
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const latitude = Number(app.globalData.dictData.latitude);
    const longitude = Number(app.globalData.dictData.longitude);
    this.setData({
      latitude,
      longitude,
      markers: [{
        id: 0,
        latitude,
        longitude,
        width: 20,
        height: 31,
        iconPath: '/images/map-icon/active_marker.png',
        callout: {
          content: '连南社保卡中心',
          padding: 8,
          display: 'ALWAYS'
        }
      }]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 调起导航
   */
  navigation() {
    wx.showLoading({
      title: '努力加载中...',
    });
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: '广州市黄埔区大沙地',
      scale: 28,
      success: res => {
        wx.hideLoading();
      }
    });
  },

  /**
   * 电话
   */
  contact() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.dictData['servicePhoneNumber'] // 仅为示例，并非真实的电话号码
    });
  },
});