// app.js
App({
  onLaunch: function(options) {
    console.log(options, '分享点进来的  ----  onLaunch');
  },
  globalData: {
    userInfo: null, // {uid: 1122330, openid: "", token: ""}
    dictData: null, // 字典数据
    jsonList: null, // 所以json数据
    goodsArr: null, // 所有商品列表 Array
    goodsData: null, // 所有商品列表 Map对象
    recommendData: null, // 推荐商品列表
  }
});