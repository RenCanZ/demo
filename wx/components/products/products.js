// components/products/products.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productlist: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        this.setData({products:newVal});
      }
    },
    typelist: {
      type: Array,
      observer: function (newVal, oldVal, changedPath) {
        this.setData({types:newVal});
      }
    }
  },
  data: {
    types:[],
    products:[],
    nowid:0
  }, // 私有数据，可用于模版渲染
  methods: {
    onClickType:function (e) {
      var id = e.currentTarget.dataset.id;
      this.setData({
        nowid:id
      });
    },
    changeNum:function (e,step) {
      var id = e.currentTarget.dataset.id;
      var list = this.data.products;
      var item = list[id];
      if(step < 1 && item.num < 1) {
        return ;
      }
      item.num += step;
      var types = this.data.types;
      if(this.data.nowid < types.length) {
        var typeobj = types[this.data.nowid];
        typeobj.num += step;
      }
      this.setData({
        products: list,
        types: types
      });
    },
    incNum: function (e) {
      this.changeNum(e,1);
    },
    decNum:function (e) {
      this.changeNum(e,-1);
    },
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function () {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }
})