// pages/search/search.js
const app = getApp()
const glob = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taglist: [],
    str:'',
    plist: [],
    tlist: []
  },
  myinput:function (e) {
    var str = e.detail.value;
    this.data.str = str;
  },
  onSearch:function (e) {
    var str = this.data.str;
    var preg = /[^\s]+/;
    if (preg.test(str)) {
      var list = this.data.taglist;
      list.push(str);
      this.updateStr(str);
      var products = this.loadProducts();
      this.setData({
        taglist: list,
        str: '',
        plist: products
      });
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 1000);
    }
  },
  updateStr:function (str) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: glob.host+'setSession.php',
      data:{
        str:str,
        sid:glob.sessionid
      },
      type:'post',
      success:function (res) {
        console.log(res);
      },
      complete: function() {
        wx.hideLoading();
      },
    });
  },
  delTagitem:function (e) {
    var id = e.currentTarget.dataset.id;
    var list = this.data.taglist;
    list.splice(id,1);
    this.setData({
      taglist: list,
      plist:[]
    });
  },
  loadProducts: function () {
    return [
      {
        productid: 1,
        title: '商品名称在这里显',
        price: 10,
        pricezk: 8.5,
        picurl: '/images/clock.png',
        num: 0,
        typeid: 1
      },
      {
        productid: 1,
        title: '商品名称在这里1',
        price: 20,
        pricezk: 18.5,
        picurl: '/images/xie.png',
        num: 0,
        typeid: 2
      }
    ];
  },
  loadStr: function (callback) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: glob.host+'getSession.php',
      type:'post',
      data: {
        sid: glob.sessionid
      },
      success: function (res) {
        if(callback) {
          callback(res.data);
        }
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.loadStr(function (res) {
      console.log(res);
      if(res) {
        var list = _this.data.taglist;
        list.push(res);
        _this.setData({
          taglist:list
        });
      }
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