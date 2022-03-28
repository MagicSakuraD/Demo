var app = getApp();
// pages/grade/scoring/scoring.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    rating:"",
    
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    this.setData({
      id:movieId
    })
    
  },

  formsubmit(e) {
    this.setData({
      rating:e.detail.value.input
    })
    wx.request({
      url: app.globalData.doubanBase+'/all/update',
      data:{
        rating:this.data.rating,
        id:this.data.movieId,
      },
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {  
        console.log("成功")  
      },
      fail: function(fail){
        console.log("失败")
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