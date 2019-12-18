// app.js
App({
  onLaunch: function(options) {
    console.log(options, '分享点进来的  ----  onLaunch');
  },
  globalData: {
    userInfo: null, // {uid: 1122330, openid: "", token: ""}
    dictData: null, // 字典数据
    goodsData: null, // 所有商品列表 Map对象
  }
});