// pages/login/login.js
const app = getApp()
const glob = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userinfo: '',
    phone:''
  },
  bindGetUserInfo: function (e) {
    var userinfo = e.detail.userInfo;
    wx.request({
      url: glob.host + 'add.php',
      data: {
        openid: glob.openid,
        avatarUrl: userinfo.avatarUrl,
        city: userinfo.city,
        nickName: userinfo.nickName,
        province: userinfo.province,
        update: 'update'        
      },
      type: 'post',
      success: function(res) {
        //console.log(res);
      },
    })
    this.setData({
      userinfo: e.detail.userInfo
    });
  },
  bindGetPhoneNumber: function (e) {
    var _this = this;
    wx.request({
      url: glob.host + 'add.php',
      data: {
        session_key: glob.session_key,
        openid: glob.openid,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        update: 'phone'
      },
      type:'post',
      success: function (res) {
        _this.setData({
          phone: res.data
        });
      },
    })
  },
  selectPhone: function () {
    var _this = this;
    wx.request({
      url: glob.host + 'add.php',
      data: {
        openid: glob.openid,
        update: 'select'
      },
      type: 'post',
      success: function(res) {
        _this.setData({
          phone: res.data
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              _this.selectPhone();
              _this.setData({
                userinfo: res.userInfo
              });
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})