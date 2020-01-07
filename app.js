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
        profile: '', //个人简介
        follow:[],//关注的数据
      },
      base: { //用户信息
        avatarUrl: "", //头像图片地址
        city: "", //所在城市
        dateAdd: "", //
        dateLogin: "",
        id: '',
        ipAdd: "",
        ipLogin: "",
        isIdcardCheck: false,
        isSeller: false,
        levelRenew: false,
        nick: "", //昵称
        province: "", //所在省份
        source: 0,
        sourceStr: "",
        status: 0,
        statusStr: "",
        username: "" //备注
      }
    },
    dictData: null, // 字典数据
    jsonList: null, // 所以json数据
    goodsArr: null, // 所有商品列表 Array
    goodsData: null, // 所有商品列表 Map对象
    recommendData: null, // 推荐商品列表
  }
});