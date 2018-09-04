function request (options) {
  wx.showLoading({
    title: '加载中',
    mask: true,
  }),
  wx.request({
    url: '',
    data: '',
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
}
module.exports = {
  request: request
}