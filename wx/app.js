//app.js
App({
  onLaunch: function () {
    this.login();
    var _this = this;
    this.getopenid(function (openid) {
      _this.addOpenid(openid);
    });
  },
  getopenid: function (callback) {
    var _this = this;
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        var appId = 'wxc853feca73955769';
        var secret = '70ee287d1fa0362d591ddbfdb7cf5816';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            // console.log(openid);
            if (callback) {
              callback(openid);
            }
          }
        })
      }
    })
  },
  login:function () {
    var _this = this;   
    wx.request({
      url: this.globalData.host + 'login.php',
      success: function (res) {
        _this.globalData.sessionid = res.data;
        // console.log(res);
      }
    })
  },
  addOpenid: function (openid) {
    console.log(openid);
    wx.request({
      url: this.globalData.host + 'add.php',
      data: {
        openid: openid
      },
      type: 'post',
      complete: function (res) {
        console.log(res);
      },
    })
  },
  globalData: {
    host:'http://localhost/demo/login/',
    userInfo: null,
    sessionid: null,
    openid:null
  }
})