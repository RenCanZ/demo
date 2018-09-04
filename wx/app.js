//app.js
App({
  onLaunch: function () {
    this.login();
  },
  login:function () {
    var _this = this;
    wx.request({
      url: this.globalData.host + 'login.php',
      success: function (res) {
        _this.globalData.sessionid = res.data;
      }
    })
  },
  globalData: {
    host:'http://localhost/login/',
    userInfo: null,
    sessionid: null
  }
})