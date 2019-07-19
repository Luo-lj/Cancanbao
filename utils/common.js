const config = require('./config.js')

/**
 * 弹出加载提示窗口
 * @param {String} message 提示信息内容（值为空则提示：努力加载中...；值为1则提示：努力处理中...；）
 */
function showLoading(message){
  let msg = config.loadingMsg;
  if(message){
    if(message == '1'){
      msg = config.processingMsg;
    }else{
      msg = message;
    }
  }
  wx.showLoading({
    title: msg,
  })
}

/**
 * 弹出模式框提示信息，注意：如果点击确定则返回true否则返回false
 * @param {String} content 错误信息
 * @param {String} confirmText 确认按钮名称；默认值：知道了
 * @param {String} cancelText 取消按钮名称；为空时不显示取消按钮
 */
function showModal(content, confirmText, cancelText){
  return new Promise(resolve => {
    wx.showModal({
      title: '温馨提示',
      content,
      confirmText: confirmText || '知道了',
      cancelText: cancelText || 'cancelText',
      showCancel: cancelText ? true : false,
      success: res => {
        resolve(res.confirm ? true : false);
      }
    });
  });
};

module.exports= {
  showLoading,
  showModal,
}