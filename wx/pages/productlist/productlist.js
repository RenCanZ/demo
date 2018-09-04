// pages/productlist/productlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[],
    products:[]
  },
  loadTypes:function () {
    return  [
      {
        typeid:1,
        title:'测试项目1',
        num:0
      },
      {
        typeid: 2,
        title: '测试项目2',
        num: 0
      }
    ];
  },
  loadProduct:function () {
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
        picurl: '/images/xie1.png',
        num: 0,
        typeid: 2
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var types = this.loadTypes();
    var products = this.loadProduct();
    this.setData({
      types:types,
      products:products
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