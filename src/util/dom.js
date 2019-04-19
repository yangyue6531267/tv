function HP () {}

HP.prototype.$ = function (selector) {
  return document.querySelector(selector)
}

HP.prototype.my = function (id) {
  return document.getElementById(id)
}

HP.prototype.hasClass = function (id, cls) {
  if (typeof id == 'string') {
    return HP.prototype.my.className.match(
      new RegExp('(\\s|^)' + cls + '(\\s|$)')
    )
  } else {
    return id.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }
}

HP.prototype.animate = function (ele, attrs, time, sp, callback) {
  animate(ele, attrs, time, sp, callback)
}

// ajax
HP.prototype.getData = function (url, successfun, failurefn) {
  failurefn =
    failurefn != undefined
      ? failurefn
      : function () {
        console.log('数据读取错误')
      }
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status
      if (status == 200) {
        var data = JSON.parse(xhr.responseText)
        successfun(data)
      } else {
        failurefn()
      }
    }
  }
  xhr.open('GET', url, true)
  xhr.setRequestHeader('If-Modified-Since', '0')
  xhr.send()
}
/**
 *
 * @param {*} obj
 * @param {*} json 小数需取整，不然会引起抖动
 * @param {*} interval
 * @param {*} sp
 * @param {*} fn
 */
function animate (obj, json, interval, sp, fn) {
  // eslint-disable-next-line no-self-assign
  interval !== undefined ? (interval = interval) : (interval = 30)
  // eslint-disable-next-line no-self-assign
  sp !== undefined ? (sp = sp) : (sp = 0.2)
  clearInterval(obj.timer)
  var k = 0
  var j = 0
  function getStyle (obj, arr) {
    if (obj.currentStyle) {
      return obj.currentStyle[arr] // 针对ie
    } else {
      var ret
      var computed = window.getComputedStyle(obj, null)
      if (computed) {
        ret = computed.getPropertyValue(arr) || computed[arr]
      }
      // Empty strings, null, undefined and "auto" are converted to 0.
      if (ret === 'auto') {
        // 适配部分android终端获取属性指为auto情况
        ret = 0
      }
      return ret
    }
  }
  obj.timer = setInterval(function () {
    console.log('开始执行')
    // j++;
    var flag = true
    for (var arr in json) {
      var icur = 0
      // k++;
      if (arr == 'opacity') {
        icur = Math.round(parseFloat(getStyle(obj, arr)) * 100)
      } else {
        icur = parseInt(getStyle(obj, arr))
      }
      var speed = (json[arr] - icur) * sp
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
      if (icur != json[arr]) {
        flag = false
      }
      if (arr == 'opacity') {
        obj.style.filter = "alpha(opacity : '+(icur + speed)+' )"
        obj.style.opacity = (icur + speed) / 100
      } else {
        obj.style[arr] = icur + speed + 'px'
      }
      // console.log(j + "," + arr + ":" + flag);
    }

    if (flag) {
      clearInterval(obj.timer)
      // console.log(j + ":" + flag);
      // console.log("k = " + k);
      // console.log("j = " + j);
      // console.log("DONE");
      if (fn) {
        fn()
      }
    }
  }, interval)
}

// jquery offset原生实现
HP.prototype.offset = function (target) {
  // eslint-disable-next-line one-var
  var top = 0, left = 0

  while (target.offsetParent) {
    top += target.offsetTop
    left += target.offsetLeft
    target = target.offsetParent
  }

  return {
    top: top,
    left: left
  }
}

// jquery position原生实现
HP.prototype.position = function (target) {
  return {
    top: target.offsetTop,
    left: target.offsetLeft
  }
}

let hp = new HP()

export { hp }
