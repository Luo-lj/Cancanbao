// pages/location/location.js
const {
  distance,
} = require('../../utils/apiData.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOk: false,
    latitude: '', // 地图中心纬度
    longitude: '', // 地图中心经度
    juLi: '', // 两地距离
    companyName: '', // 店铺名字
    shopAddress: '', // 店铺地址
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const latitude = Number(app.globalData.dictData.latitude);
    const longitude = Number(app.globalData.dictData.longitude);
    const companyName = app.globalData.dictData.companyName;
    const _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const obj = {
          lat1: res.latitude,
          lat2: latitude,
          lng1: res.longitude,
          lng2: longitude
        };
        distance(obj).then(res => {
          console.log('距离====>>>>', res.toFixed(2));
          _this.setData({
            isOk: true,
            latitude,
            longitude,
            juLi: res.toFixed(2),
            companyName,
            shopAddress: app.globalData.dictData.shopAddress,
            markers: [{
              id: 0,
              latitude,
              longitude,
              width: 20,
              height: 31,
              iconPath: '/images/map-icon/active_marker.png',
              callout: {
                content: companyName,
                padding: 8,
                display: 'ALWAYS'
              }
            }]
          });
        });
      }
    });


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
    // wx.makePhoneCall({
    //   phoneNumber: app.globalData.dictData['servicePhoneNumber'] // 仅为示例，并非真实的电话号码
    // });
  },
});