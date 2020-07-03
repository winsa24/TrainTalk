// pages/primary/primary.js
function countdown(that) {
  var second = that.data.second;
  if (second == 0) {    // console.log("Time Out...");
    that.setData({
      second: "Time Out...",
      pa: false
    }); 
    that.recorderManager.stop();
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    b1:"paused",
    pa: true,
    second: 30,
    word: "",
    wtype: "",
    adj: ["安全","跋扈","霸道","温柔","滑稽","开朗","活波","怪异","仁慈","华丽","时尚","成熟","典雅","紧张","痛苦","迷茫","亲密","危险"],
    verb: ["安装", "跋涉", "霸占", "学习", "开始", "发生", "想念", "喜欢", "枯萎", "过来", "批评", "愿意", "生长", "停止", "担心", "试试", "愿意", "消灭"],
    noun: ["岸边", "八月", "白菜", "病毒", "家人", "国家", "家庭", "技术", "老板", "篮球", "太阳", "炸弹", "海军", "酒店", "快递", "香水", "公园", "粉丝"]
  },

  start: function(){
    var that = this;
    this.setData({
      b1: "running",
    })
    setTimeout(() => {
      that.getWord();
      countdown(that);
      this.recorderManager.start({
        format: 'mp3'  // 如果录制acc类型音频则改成aac
      });
    }, 6000);
    
  },

  getWord: function (){
    var that = this;
    var type = Math.round(Math.random() * 3);
    console.log(type)
    if(type == 0){
      var random = Math.round(Math.random() * 18);
      that.setData({
        word: that.data.adj[random],
        wtype: "(形容词)"
      })
    }else if(type == 1){
      var random = Math.round(Math.random() * 18);
      that.setData({
        word: that.data.verb[random],
        wtype: "(动词)"
      })
    }else{
      var random = Math.round(Math.random() * 18);
      that.setData({
        word: that.data.noun[random],
        wtype: "(名词)"
      })
    }
    
  },

  audioRec: function(){
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      // 录音失败的回调处理
    });
    this.recorderManager.onStop(function (res) {
      // 停止录音之后，把录取到的音频放在res.tempFilePath
      that.setData({
        src: res.tempFilePath
      })
      console.log(res.tempFilePath)
    });

  },

  playAudio: function() {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      // 播放音频失败的回调
    })
    this.innerAudioContext.src = this.data.src;  // 这里可以是录音的临时路径
    this.innerAudioContext.play();
    this.innerAudioContext.onEnded(() => {
      console.log("音频自然播放结束")
    })
  },

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.audioRec();

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