// pages/weather/weather.js
var bmap = require('../libs/bmap-wx.min.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topView: 1,//天气的显示隐藏
    weatherData: '',//天氣
    weatherTips:[],//天气小提醒
    futureWeather:[],//未来四天天气状况
    futureWeatherShow:1,//天气显示
    futureWeatherTltleUnder:1,//天气提示显示
    getFuture:1,//获取按钮显示隐藏
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    xingbie: ''//用户性别信息性别 0：未知、1：男、2：女
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    var heihei=this
    wx.getUserInfo({
      success(res) {
        // console.log(res)
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
        heihei.setData({
          xingbie: userInfo.gender
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    //天氣
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'wnuutELgnvKagUHs2iGTTu77uKdjpC9y'
    });
    var fail = function (data) {
      // console.log(data)
    };
    var success = function (data) {
      // console.log(data.originalData.results[0].weather_data)
      var weatherData = data.currentWeather[0];
      weatherData = '當前城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData,
        weatherTips: data.originalData.results[0].index,
        futureWeather: data.originalData.results[0].weather_data
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    }); 
  },
  // 关闭信息弹框
  goClose: function () {
    // 同时进行页面跳转
    wx.switchTab({
      url:'../index/index'
    })
  },
  goF111: function () {
    wx.navigateTo({
      url: '../../pageA/pages/cat/cat',
    })
  },
  getFutureW:function(){
    this.setData({
      futureWeatherShow: 2,
      futureWeatherTltleUnder:2,
      getFuture:2
    })
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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