// components/l-cell/index.js
Component({
  behaviors: [],
  externalClasses: ['component-class', 'prepend-class', 'desc-class', 'cell-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    label: String,
    desc: String,
    access: Boolean,
    disabled: {
      type: Boolean,
      value: false
    },
    history: {
      type: Boolean,
      value: false
    },
    to: {
      type: String,
      value: ''
    },
    toType: {
      type: String,
      value: 'to'
    },
    iconType: String,
    iconSize: {
      type: Number,
      value: 36
    },
    iconColor: String
  },
  data: {},
  methods: {
    handleTap(e) {
      if (!this.properties.disabled) {
        this.navigator();
        this.triggerEvent('tap', e.detail);
      }
    },
    // 统一提供跳转方法
    navigator() {
      const { to, toType } = this.properties;
      if (!to)
        return false;
      if (toType === 'to')
        wx.navigateTo({ url: to });
      if (toType === 'redirect')
        wx.redirectTo({ url: to });
      if (toType === 'switch')
        wx.switchTab({ url: to });
      if (toType === 'reLaunch')
        wx.reLaunch({ url: to });
    }
  }
});