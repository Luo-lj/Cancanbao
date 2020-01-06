// app.js
App({
  onLaunch: function(options) {
    console.log(options, '分享点进来的  ----  onLaunch');
  },
  globalData: {
    userInfo: {
      uid: '',
      openid: "",
      token: "",
      ext: { //订单扩展属性信息,JSON格式
        profile: '', //扩展数据
      },
      base: { //用户信息
        "avatarUrl": "", //头像图片地址
        "city": "Guangzhou", //所在城市
        "dateAdd": "2019-12-17 19:39:18", //
        "dateLogin": "2020-01-06 20:51:47",
        "id": 1175237,
        "ipAdd": "223.74.68.180",
        "ipLogin": "223.74.68.0",
        "isIdcardCheck": false,
        "isSeller": false,
        "levelRenew": false,
        "nick": "", //昵称
        "province": "", //所在省份
        "source": 0,
        "sourceStr": "",
        "status": 0,
        "statusStr": "",
        "username": "" //备注
      }
    },
    dictData: null, // 字典数据
    jsonList: null, // 所以json数据
    goodsArr: null, // 所有商品列表 Array
    goodsData: null, // 所有商品列表 Map对象
    recommendData: null, // 推荐商品列表
  }
});