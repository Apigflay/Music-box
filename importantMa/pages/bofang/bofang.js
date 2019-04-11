// pages/bofang/bofang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bofangUrl:"../images/play.png",
    messageObj:null,//当前页面数据
    songLyric:'',//歌词-未处理
    storyContent: [],//文稿数组，转化完成用来在wxml中使用
    marginTop: 0,//文稿滚动距离
    currentIndex222: 0//当前正在第几行
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(decodeURIComponent(options.id)))
    this.setData({ 
      messageObj:JSON.parse(decodeURIComponent(options.id))
      })
      //处理字符串信息
  },
  // // // 处理字幕信息 --分割
  // parseLyric: function (text) {
  //   var result = [];
  //   var lines = text.split('\n'); //切割每一行
  //     var pattern = /\[\d{2}:\d{2}.\d{3}\]/g;//用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
  //   //去掉不含时间的行
  //   while(!pattern.test(lines[0])) {
  //     lines = lines.slice(1);
  //   };
  //   //上面用'\n'生成数组时，结果中最后一个为空元素，这里将去掉
  //   lines[lines.length - 1].length === 0 && lines.pop();
  //   lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
  //     //提取出时间[xx:xx.xx]
  //     var time = v.match(pattern),
  //       //提取歌词
  //      value = v.replace(pattern, '');
  //     // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
  //     time.forEach(function (v1, i1, a1) {
  //       //去掉时间里的中括号得到xx:xx.xx
  //       var t = v1.slice(1, -1).split(':');
  //       //将结果压入最终数组
  //       result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
  //     });
  //   });
  //   //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
  //   result.sort(function (a, b) {
  //     return a[0] - b[0];
  //   });
  //   return result;
  // },
  // // 处理字幕信息 --去除空白
  // sliceNull: function (lrc) {
  //   var result = []
  //   for (var i = 0; i < lrc.length; i++) {
  //     if (lrc[i][1] == "") {
  //     } else {
  //       result.push(lrc[i]);
  //     }
  //   }
  //   return result
  // },
  // 获取歌词方法
  getMusic:function(){
    // console.log(this.data.messageObj.id)
    var that = this
      // 点击获取歌词
    wx.request({
      url: 'https://api.itooi.cn/music/netease/lrc', //仅为示例，并非真实的接口地址
      method: "GET",
      data: {
        "key": '579621905',
        "id": this.data.messageObj.id
      },
      success: function (res) {//回掉函数保存数据改变this
        console.log(res.data)
        that.setData({
          songLyric: res.data
        })
// ---------------------
        // console.log(that.sliceNull(that.parseLyric(res.data)))
        // that.setData({
        //   storyContent: that.sliceNull(that.parseLyric(res.data))
        // })
// ----------------
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