// pages/userinfo/userinfo.js
const app = getApp();
const {
  userModify,
  userDetail
} = require('../../utils/apiData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      nick: '', // 昵称
      province: '', // 省份
      city: '', // 城市
      profile: '', // 个人简介
    },
    rules: [{
      name: 'nick',
      rules: {
        required: true,
        message: '请输入昵称'
      },
    }, {
      name: 'province',
      rules: {
        required: true,
        message: '请输入所在省份'
      },
    }, {
      name: 'city',
      rules: {
        required: true,
        message: '请输入所在城市'
      },
    }, {
      name: 'profile',
      rules: {
        required: true,
        message: '请输入个人简介'
      },
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    userDetail({
      token: app.globalData.userInfo.token
    }).then(res => {
      console.log('获取用户信息', res);
      this.setData({
        formData: {
          nick: res.base.nick, // 昵称
          province: res.base.province, // 省份
          city: res.base.city, // 城市
          profile: res.ext.profile, // 个人简介
        }
      });
    });
  },

  formInputChange(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.setData({
      [`formData.${id}`]: e.detail.value
    });
  },

	//表单提交
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors);
      if (!valid) {
        const firstError = Object.keys(errors);
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          });

        }
      } else {
        console.log(app.globalData.userInfo.ext);
        app.globalData.userInfo.ext.profile = this.data.formData.profile;
        let obj = {
          token: app.globalData.userInfo.token,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nick: this.data.formData.nick,
          province: this.data.formData.province,
          city: this.data.formData.city,
          extJsonStr: JSON.stringify(app.globalData.userInfo.ext)
        };
        userModify(obj).then(res => {
          console.log('修改用户成功', res);
          wx.navigateBack();
        });
      }
    });
  }

});