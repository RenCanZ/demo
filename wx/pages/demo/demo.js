// pages/demo/demo.js
var order = ['red', 'yellow', 'blue', 'green', 'red'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    list: [
      {
        icon1: 'new.png',
        title1: '新品推荐',
        icon2: 'xlx.png',
        title2: '行李箱'
      }, {
        icon1: 'hz.png',
        title1: '开店礼包',
        icon2: 'bao.png',
        title2: '男女包'
      }, {
        icon1: 'tuan.png',
        title1: '一起拼团',
        icon2: 'xie.png',
        title2: '男女鞋'
      }, {
        icon1: 'ms.png',
        title1: '限时秒杀',
        icon2: 'jiaojuan.png',
        title2: '皮带'
      }, {
        icon1: 'cj.png',
        title1: '抽奖福利',
        icon2: 'wazi.png',
        title2: '袜子区'
      }
    ],
    listUrl: [
      {
        img1:'2.png',
        url:'',
        img2: '2.png',
        url: '',
        img3: '2.png',
        url: ''
      },{
        img1: '2.png',
        url: '',
        img2: '2.png',
        url: '',
        img3: '2.png',
        url: ''
      }
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    toView: 'red',
    interval:3000,
    scrollTop: 100,
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  goSearch:function ()
  {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  gotoProductlist:function ()  {
    wx.navigateTo({
      url: '/pages/productlist/productlist',
    })
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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