const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//评分的格式转化函数
function convertToStarsArray(stars) {
  var num = stars / 2;
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
        array.push(0);
      }
    }
  
  return array;
}

function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "content-type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

module.exports = {
  formatTime,
  convertToStarsArray:convertToStarsArray,
  http:http
}


