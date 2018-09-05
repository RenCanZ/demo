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
        var appId = 'wx1737f8d55ae0d897';
        var secret = '4896a9132cefba12a01e1132d5c1c23e';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid; //返回openid
            var session_key = res.data.session_key;
            _this.globalData.session_key = session_key;
            _this.globalData.openid = openid;
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
    //console.log(openid);
    wx.request({
      url: this.globalData.host + 'add.php',
      data: {
        openid: openid,
        update: 'insert'
      },
      type: 'post',
      complete: function (res) {
        // console.log(res);
      },
    })
  },
  globalData: {
    host:'http://localhost/demo/login/',
    userInfo: null,
    sessionid: null,
    openid:null,
    session_key:null
  }
})