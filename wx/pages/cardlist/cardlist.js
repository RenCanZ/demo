// pages/cardlist/cardlist.js
const app = getApp()
const glob = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: []
  },
  cardlist: function (callback) {
    var _this = this;
    wx.request({
      url: 'http://192.168.1.185/youhuijuan/loadcard.php',
      success: function(res) {
        if(callback) {
          callback(res);
        }
      }
    })
  },
  setCard: function (e) {
    var _this = this;
    var juanid = e.currentTarget.dataset.juanid;
    var data = {
      juanid: juanid,
      openid: glob.openid
    }
   wx.request({
     url: 'http://192.168.1.185/youhuijuan/getcard.php',
     data: {
       data: data
     },
     success: function(res) {
       _this.setData({
         card:res.data
       });
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.cardlist(function (res) {
      _this.setData({
        card:res.data
      });
    });
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