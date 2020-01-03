// pages/joke/joke.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: '', //获取屏幕的高度
    index: 0, //第几条
    page:0,
    content: '', //内容
    jokeData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getJokeData().then(() => {
      this.setData({
        windowHeight: wx.getSystemInfoSync().windowHeight, // 获取屏幕的高度
        content: this.data.jokeData[this.data.index].content,
      })
    })
  },

  //获取笑话大全
  getJokeData() {
    return new Promise(resolve => {
      const _this = this;
      _this.data.page++;
      wx.request({
        url: 'https://v.juhe.cn/joke/content/list.php', //仅为示例，并非真实的接口地址
        data: {
          sort: 'desc',
          page: _this.data.page,
          time: new Date().getTime().toString().substr(0, 10),
          key: '3082e3347235e2a97a8034158760f13b'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log("===>>>",res)
          _this.data.jokeData = _this.data.jokeData.concat(res.data.result.data);
          resolve()
        }
      })
    })
  },

  //上一条
  upItem() {
    this.data.index--;
    console.log("上一条", this.data.index)
    if (this.data.index >= 0) {
      this.setData({
        content: this.data.jokeData[this.data.index].content,
      })
    }else{
      this.data.index = 0;
    }
  },

  //下一条
  nextItem() {
    this.data.index++;
    console.log("===>>>下一条", this.data.index, this.data.jokeData.length - 1)
    if (this.data.index > this.data.jokeData.length - 1) {
      this.getJokeData().then(() => {
        this.setData({
          content: this.data.jokeData[this.data.index].content,
        })
      })
    } else {
      this.setData({
        content: this.data.jokeData[this.data.index].content,
      })
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})