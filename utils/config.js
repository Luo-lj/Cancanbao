const apiUrl = 'https://api.it120.cc'; //域名
const myUrl = 'llj'; //首页专属域名
const loadingMsg = "努力加载中..."; //加载中的提示
const processingMsg = "努力处理中...";
const dictKeys = [ // 系统参数
  'companyName', //店铺名字
  'shopAddress',//店铺地址
  'longitude', // 店铺中心经度
  'latitude', // 店铺中心纬度
  'servicePhoneNumber', //联系我们——手机号码
  'aboutUsTitle', // 关于我们——弹窗标题
  'aboutUsContent', //关于我们——弹窗内容
]

module.exports = {
  apiUrl,
  myUrl,
  loadingMsg,
  processingMsg,
  dictKeys
}