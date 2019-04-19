//index.js
//获取应用实例
var bmap = require('../libs/bmap-wx.min.js')
const app = getApp()

Page({
  data: {
    imgUrls: ['https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1230486.jpg?max_age=2592000', 'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1233464.jpg?max_age=2592000', 'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1230131.jpg?max_age=2592000','https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1234416.jpg?max_age=2592000'],
    indicatorDots:'true',
    autoplay:"true",
    interval:"3000",
    duration:2000,
    "easing-function":"linear",
    motto: '跳动的世界',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    songsArry:{},//歌曲信息
    imggesP:true,//播放更换图片
    lunIndex:-1//轮播判断值
    // topView:1,//天气的显示隐藏
    // weatherData: ''//天氣
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://api.itooi.cn/music/netease/songList', //仅为示例，并非真实的接口地址
      method:"GET",
      data: {
        "key": '579621905',
        "id": '3778678',
        "limit":'10',
        "offset":"0"
      },
      success: function (res) {
        that.setData({
          songsArry: res.data.data
        })
        // wx.playBackgroundAudio({
        //   // dataUrl: res.data.data.songs[1].url
        // })
      }
    })
  },
  // 点击播放
  
  goMusic:function(e){
    var that = this
    // console.log(e.currentTarget.id)
    this.setData({
      lunIndex:e.currentTarget.id
    })
    // console.log(this.data.songsArry.songs)
    wx.playBackgroundAudio({
      dataUrl: this.data.songsArry.songs[e.currentTarget.id].url,
      title: this.data.songsArry.songs[e.currentTarget.id].name,
      coverImgUrl: this.data.songsArry.songs[e.currentTarget.id].pic,
      success:function(res){
        console.log(res)
      },
      fail:function(err){
        console.log(err)
      },
      complete:function(com){
        console.log(com)
      }
    })
    wx.onBackgroundAudioStop(function(){
      // console.log(that.data.songsArry.songs)
      var nextIndex = that.data.lunIndex * 1 + 1;
      that.setData({
        lunIndex: nextIndex
      })
      // console.log(nextIndex)
      wx.playBackgroundAudio({
        dataUrl: that.data.songsArry.songs[nextIndex].url,
        title: that.data.songsArry.songs[nextIndex].name,
        coverImgUrl: that.data.songsArry.songs[nextIndex].pic
      })
    })
    // wx.playBackgroundAudio({
    //   dataUrl: this.data.songsArry.songs[e.currentTarget.id].url,
      // title: this.data.songsArry.songs[e.currentTarget.id].name,
      // coverImgUrl: this.data.songsArry.songs[e.currentTarget.id].pic
    // })
    // 播放页面传递的参数
    var sing_canshu = this.data.songsArry.songs[e.currentTarget.id]
    // console.log(sing_canshu)
    // 同时进行页面跳转
    // wx.navigateTo({
    //   url: '../bofang/bofang?id=' + encodeURIComponent(JSON.stringify(sing_canshu)),
    // })
  },
  // // 关闭信息弹框
  // goClose:function(){
  //   this.setData({
  //     topView:2
  //   })
  // },
  //设置进度
  listenerButtonSeek: function() {
      wx.seekBackgroundAudio({
          position: 268
      })
  },
  // 打电话
  goCall:function(){
    wx.makePhoneCall({
      phoneNumber: '15713801628' // 仅为示例，并非真实的电话号码
    })
  }
})



//https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1230486.jpg?max_age=2592000
//https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1233464.jpg?max_age=2592000
//https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1230131.jpg?max_age=2592000
//https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1234416.jpg?max_age=2592000

