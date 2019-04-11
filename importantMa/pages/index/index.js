//index.js
//获取应用实例
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
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    songsArry:{},
    imggesP:true,//播放更换图片
    lunIndex:-1//轮播判断值
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 获取用户信息
    wx.getUserInfo({
      success(res) {
        // const userInfo = res.userInfo
        // const nickName = userInfo.nickName
        // const avatarUrl = userInfo.avatarUrl
        // const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        // const province = userInfo.province
        // const city = userInfo.city
        // const country = userInfo.country
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
        // console.log(res.data.data)
        // let data = res.data.data.songs
        // data.forEach(function(i,v){
        //   data[v]['issao'] = false
        // })
        // res.data.data.songs = data

        that.setData({
          songsArry: res.data.data
        })
       
        wx.playBackgroundAudio({
          // dataUrl: res.data.data.songs[1].url
        })
      }
    })
  },
  // 点击播放
  goMusic:function(e){
    this.setData({
      // songsArry:temp
      lunIndex:e.currentTarget.id
    })
    console.log(this.data.songsArry.songs)
    wx.playBackgroundAudio({
      dataUrl: this.data.songsArry.songs[e.currentTarget.id].url
    })
    // 播放页面传递的参数
    var sing_canshu = this.data.songsArry.songs[e.currentTarget.id]
    // console.log(sing_canshu)
    // 同时进行页面跳转
    wx.navigateTo({
      url: '../bofang/bofang?id=' + encodeURIComponent(JSON.stringify(sing_canshu)),
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})



//https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1230486.jpg?max_age=2592000
//https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1233464.jpg?max_age=2592000
//https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1230131.jpg?max_age=2592000
//https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1234416.jpg?max_age=2592000

