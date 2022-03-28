var app = getApp()
var util = require('../../utils/util')
// pages/grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var allUrl = app.globalData.doubanBase +"/all";
    util.http(allUrl, this.processDoubanData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban) {
      var subject = moviesDouban[idx];
      var title = subject.name;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating),
        title: title,
        average: subject.rating,
        coverageUrl: subject.image,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = []
    totalMovies = this.data.movies.concat(movies);
    this.setData({
      movies: totalMovies
    });
    
    wx.stopPullDownRefresh();
    //隐藏loading状态
    wx.hideNavigationBarLoading();
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

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: "./scoring/scoring?id=" + movieId
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})