var util = require('../../utils/util.js')
var app = getApp();

// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");

  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "content-type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey,
    categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban) {
      var subject = moviesDouban[idx];
      var title = subject.name;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      
      var temp = {
        stars: util.convertToStarsArray(subject.rating),
        title: title,
        average: subject.rating,
        coverageUrl: subject.image,
        movieId: subject.id
      }
      movies.push(temp)
    }
    console.log(movies);
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },
  
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    console.log(category);
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
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

  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {},
      inputValue: ''
    }
    )
  },

  onBindConfirm: function (event) {
    var keyWord = event.detail.value;
    var searchUrl = app.globalData.doubanBase +
      "/search?q=" + keyWord;
    this.getMovieListData(searchUrl, "searchResult", "");

  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },

})