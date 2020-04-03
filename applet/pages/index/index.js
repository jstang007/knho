//index.js
//获取应用实例
const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
const authUtil = require('../../utils/auth.js')

Page({
  data: {
    imgUrls: [
      {
        link: '',
        url: '../../resources/tabbar/clamav.png'
      },
      {
        link: '',
        url: '../../resources/tabbar/kbase.png'
      },
      {
        link: '',
        url: '../../resources/tabbar/dns.png'
      },
    ],
    indicatorDots: true, //小点
    indicatorColor: "white",//指示点颜色
    activeColor: "coral",//当前选中的指示点颜色
    autoplay: true, //是否自动轮播
    interval: 5000, //间隔时间
    duration: 1000, //滑动时间
    result: [
      { //当获取clamd多客户端扫描结果时，会有多条result记录
        name: "clamd",
        value: "CPU > 82%",
        timestamp: 1585108806,
      },
      { //当获取clamd多客户端扫描结果时，会有多条result记录
        name: "redis",
        value: "CPU> 32%",
        timestamp: 1585108806,
      },
      { //当获取clamd多客户端扫描结果时，会有多条result记录
        name: "prometheus",
        value: "MEM > 38%",
        timestamp: 1585108806,
      },
    ],
    default_city: { "cities": ["深圳"] },
    isAuthorized: false,
    weatherData: null,
    userInfo: null,
    hasUserInfo: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  updateData: function () {
    wx.showLoading({ title: '加载中', })
    var that = this
    var header = {}
    if (that.data.isAuthorized){
      var cookie = cookieUtil.getCookieFromStorage()
      header.Cookie = cookie
      var methord = 'GET'
    } else{
      var methord = 'POST'
    }
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/weather',
      method: methord,
      header: header,
      data: {
        cities: that.data.default_city
      },
      success: function (res) {
        that.setData({ weatherData: res.data.data })
        wx.hideLoading()
      }
    })
  },
  //下拉刷新,先检查session是否过期，再更新页面数据
  onPullDownRefresh: function () {
    var that = this
    that.updateData()
    var promise = authUtil.getStatus(app)
    promise.then(function (status) {
      if (status) {
        that.setData({ isAuthorized: true })
      } else {
        that.setData({ isAuthorized: false })
        wx.showToast({
          title: '请先登陆',
          icon: 'none'
        })
      }
    })
  },
  onLoad: function () {
    this.onPullDownRefresh()
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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  teststorage: function (event) {
    wx.setStorage({
      key: 'mykey',
      data: 'mydata',
    })
    wx.getStorage({
      key: 'mykey',
      success: function (res) {
        console.log(res.data)
      },
    })
  },
  onShow: function () {
    var that = this
    that.onPullDownRefresh()
  }
})
