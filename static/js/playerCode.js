var playerCore;
playerCore = (function () {
  var currentTime = 0, totalTime = 0;// 当前播放时间，总时长
  var currentState = 0, prevState = 0;// 当前播放器状态，上一状态，状态检测定时器
  var bufferNumber = 0, bufferTimeout = 0, bufferTimer;// 当前缓冲进度，缓冲时间，进度检测定时器
  var mediaUrl = '';// 媒体文件地址
  var mediaObj = {};// 播放器对象
  var digit = /\d/;// 匹配数字
  var isHualuBox = false;// 是否华录
  var pausetype = false; // 是否暂停
  var actionPlayTimer;
  var isStoppingFlag;// 标识当前是否正在停止播放器,在调用playercore.stop()时,置为true，在onstop时置为false。true时，碰到stop(true)时，不再调用stop方法
  var state = {
    init: -2,
    ready: -1, // 初始化
    stop: 0, // 停止
    play: 1, // 播放
    pause: 2, // 暂停
    buffer: 3, // 缓冲
    over: 4, // 结束
    exception: 5, // 异常
    error: 6// 错误
  };

  var opt = {
    id: '', // 播放控件ID
    url: '', // 视频地址
    timeout: 0, // 超时时间
    beginTime: 0, // 开始播放时间
    onReady: '', // 参数处理结束回调函数
    onPlay: '', // 进入播放状态的回调函数
    onBuffer: '', // 进入缓冲状态时的回调函数
    onPause: '', // 进入暂停状态的回调函数
    onResume: '', // 进入唤醒状态的回调函数
    onStop: '', // 视频播被停止后的回调函数
    onOver: '', // 视频播放结束后的回调函数
    onException: '', // 发生异常时的回调函数
    onError: '', // 发生错误时的回调函数
    onStateChange: ''// 状态改变时的回调函数
  };

  var coreTimer;

  var playerCore = function () {
  };

  function $ (objId) {
    return document.getElementById(objId) || null;
  };
  // 移除页面上所有的播放器插件
  function removeAllMediaPlayer () {
    console.log('playerCore removeAllMediaPlayer start');
    if (currentState != state.stop && currentState != state.init && currentState != state.over) {
      console.log('playerCore can not removeAllMediaPlayer because of player state=' + currentState + ',waiting 200ms to retry...');
      setTimeout(removeAllMediaPlayer, 50);
      return;
    }
    var target = [];
    var embeds = [], objects = [];
    var i;
    embeds = document.getElementsByTagName('embed');
    objects = document.getElementsByTagName('object');
    for (i = 0; i < embeds.length; i++) {
      if (embeds[i].getAttribute('type') == 'application/yst-player') {
        target.push(embeds[i]);
      }
    }
    ;
    for (i = 0; i < objects.length; i++) {
      if (objects[i].getAttribute('type') == 'application/yst-player') {
        target.push(objects[i]);
      }
    }
    ;
    for (i = 0; i < target.length; i++) {
      target[i].parentNode.removeChild(target[i]);
    }
    ;
    console.log('playerCore removeAllMediaPlayer end');
  };
  // 创建一个新的播放器插件
  function createNewMediaPlayer () {
    console.log('playerCore createNewMediaPlayer start');
    if (currentState != state.stop && currentState != state.init && currentState != state.over) {
      console.log('playerCore can not createNewMediaPlayer because of player state=' + currentState + ',waiting 200ms to retry...');
      setTimeout(createNewMediaPlayer, 50);
      return;
    }
    var option = arguments && arguments[0];
    var objId = typeof opt.id == 'string' && (!!opt.id) ? opt.id : 'TVPlayer';
    // var parentArea = (!!opt && (typeof opt.id == "string") && (!!opt.id)) ? $(opt.id).parentNode : document.body;
    var parentArea = document.body;
    var w = (option || 0) && (option.w || 0) && (option.w > 0 ? option.w : 0);
    var h = (option || 0) && (option.h || 0) && (option.h > 0 ? option.h : 0);
    var x = (option || 0) && (option.x || 0) && (option.x > 0 ? option.x : 0);
    var y = (option || 0) && (option.y || 0) && (option.y > 0 ? option.y : 0);
    mediaObj = document.createElement('embed');
    mediaObj.setAttribute('id', objId);
    mediaObj.setAttribute('type', 'application/yst-player');
    mediaObj.setAttribute('width', w);
    mediaObj.setAttribute('height', h);
    mediaObj.style.position = 'absolute';
    mediaObj.style.top = y + 'px';
    mediaObj.style.left = x + 'px';
    mediaObj.style.zIndex = '-9999';
    parentArea.appendChild(mediaObj);
    console.log('playerCore createNewMediaPlayer end');
  };
  // 改变播放器状态
  function changeState (s) {
    console.log('playerCore changeState start');
    function stateFn (s) {
      for (var key in state) {
        if (s == state[key]) {
          return key;
        }
      }
      return 'unknown state';
    };
    currentState = s;
    if (prevState != s || !pausetype) {
      console.log('playerCore changeState from ' + stateFn(prevState) + ' to ' + stateFn(s));
      currentState = prevState = s;
      if (opt.onStateChange && typeof opt.onStateChange == 'function') {
        opt.onStateChange();
      }
      switch (s) {
        case state.ready:
          if (opt.onReady && typeof opt.onReady == 'function') {
            opt.onReady();
          }
          break;
        case state.stop:
          if (opt.onStop && typeof opt.onStop == 'function') {
            opt.onStop();
          }
          break;
        case state.play:
          if (opt.onPlay && typeof opt.onPlay == 'function') {
            opt.onPlay();
          }
          break;
        case state.pause:
          if (opt.onPause && typeof opt.onPause == 'function') {
            opt.onPause();
          }
          break;
        case state.buffer:
          if (opt.onBuffer && typeof opt.onBuffer == 'function') {
            opt.onBuffer();
          }
          break;
        case state.over:
          if (opt.onOver && typeof opt.onOver == 'function') {
            opt.onOver();
          }
          break;
        case state.exception:
          if (opt.onException && typeof opt.onException == 'function') {
            opt.onException();
          }
          break;
        case state.error:
          if (opt.onError && typeof opt.onError == 'function') {
            opt.onError();
          }
          break;
      }
    }
    console.log('playerCore changeState end');
  };
  // 收到底层播放器onPlayReady消息
  function onPlayReady () {
    console.log('playerCore onPlayReady start');
    changeState(state.ready);
    console.log('playerCore onPlayReady end');
  };
  // 收到底层播放器onPlayForceStop消息
  function onPlayForceStop () {
    console.log('playerCore onPlayForceStop start');
    changeState(state.stop);
    clearTimer();
    console.log('playerCore onPlayForceStop end');
  };
  // 收到底层播放器onPlayStop消息
  function onPlayStop () {
    console.log('playerCore onPlayStop start');
    changeState(state.over);
    clearTimer();
    console.log('playerCore onPlayStop end');
  };
  // 收到底层播放器onPlayError消息
  function onPlayError () {
    console.log('playerCore onPlayError start');
    changeState(state.error);
    clearTimer();
    console.log('playerCore onPlayError end');
  };
  // 收到底层播放器onBufferingStart消息
  function onBufferingStart () {
    console.log('playerCore onBufferingStart start');
    bufferNumber = mediaObj.getBufferingProgress();
    bufferTimeout = 0;
    if (bufferTimer) clearInterval(bufferTimer);
    bufferTimer = setInterval(function () {
      bufferNumber = mediaObj.getBufferingProgress();
      console.log('playerCore onBufferingStart bufferNumber -> ' + bufferNumber + 'at time:' + (new Date()).toString());
      if (bufferNumber >= 100) {
        bufferNumber = 100;
        clearTimer();
      }
      ;
      bufferTimeout++;
      if (bufferTimeout > opt.timeout * 10) {
        console.log('playerCore buffer timeout over ' + (opt.timeout) + ' seconds');
        changeState(state.exception);
        clearTimer();
      }
    }, 100);
    changeState(state.buffer);
    console.log('playerCore onBufferingStart end');
  };
  // 收到底层播放器onBufferingComplete消息
  function onBufferingComplete () {
    console.log('playerCore onBufferingComplete start');
    bufferTimeout = 0;
    bufferNumber = 0;
    clearTimer();
    changeState(state.play);
    console.log('playerCore onBufferingComplete end');
  };

  function clearTimer () {
    console.log('playerCore clearTimer start');
    if (bufferTimer) clearInterval(bufferTimer);
    console.log('playerCore clearTimer end');
  };
  /**
* start player.
 * @param {opt}
 * @return {booleam}
 * @example var result=playerCore.ready(opt);
 */
  playerCore.ready = function () {
    console.log('playerCore ready start');
    isStoppingFlag = false;
    var options = (arguments && arguments[0]) || {};
    prevState = currentState = state.init;
    currentTime = totalTime = 0;
    // handle options.id,set mediaObj;
    if (typeof options.id == 'string' && (!!options.id)) {
      mediaObj = $(options.id);
      if (!!mediaObj == false) {
        opt.id = options.id;
        removeAllMediaPlayer();
        createNewMediaPlayer();
      }
    } else { // no id,so remove old and create a new embed;
      if (!!mediaObj == false) {
        removeAllMediaPlayer();
        createNewMediaPlayer();
      }
    }
    if (navigator.platform == 'Win32' || navigator.platform == 'Windows') {
      if (mediaObj && mediaObj.destroy) mediaObj.destroy();
      mediaObj = getmediaObjTest();
    }
    // handle options.url,set mediaUrl;
    if (options.url && typeof options.url == 'string') {
      mediaUrl = options.url;
      opt.url = options.url;
    } else {
      console.log('playerCore:url err');
      changeState(state.exception);
      return false;
    }
    ;

    // handle timeout
    opt.timeout = typeof (options.timeout = parseInt(options.timeout)) == 'number' ? options.timeout : 60;
    // handle beginTime
    opt.beginTime = typeof (options.beginTime = parseInt(options.beginTime)) == 'number' ? options.beginTime : 0;

    // handle event callback
    if (typeof options.onReady == 'function') opt.onReady = options.onReady;
    if (typeof options.onPlay == 'function') opt.onPlay = options.onPlay;
    if (typeof options.onBuffer == 'function') opt.onBuffer = options.onBuffer;
    if (typeof options.onPause == 'function') opt.onPause = options.onPause;
    if (typeof options.onResume == 'function') opt.onResume = options.onResume;
    if (typeof options.onStop == 'function') opt.onStop = options.onStop;
    if (typeof options.onOver == 'function') opt.onOver = options.onOver;
    if (typeof options.onException == 'function') opt.onException = options.onException;
    if (typeof options.onError == 'function') opt.onError = options.onError;
    if (typeof options.onStateChange == 'function') opt.onStateChange = options.onStateChange;
    console.log('ready:--->{url:' + opt.url + ',beginTime:' + opt.beginTime + ',name:' + options.name + ',default:' + 0 + ',logOption:' + options.logOption + '}');
    console.log('ready:--->{url:' + JSON.stringify(options.logOption) + '}');
    try {
      // eslint-disable-next-line valid-typeof
      if (typeof options.logOption !== null) opt.logOption = JSON.stringify(options.logOption);
    } catch (ex) {
      console.log("can't JSON.stringify:" + options.logOption);
    }
    var actionPlay = function () {
      // reg event
      console.log('playerCore actionPlay start');
      mediaObj.onPlayReady = onPlayReady;
      mediaObj.onPlayStop = onPlayStop;
      mediaObj.onPlayForceStop = onPlayForceStop;
      mediaObj.onPlayError = onPlayError;
      mediaObj.onBufferingStart = onBufferingStart;
      mediaObj.onBufferingComplete = onBufferingComplete;
      console.log('actionPlay:url-->' + opt.url);
      console.log('actionPlay:beginTime-->' + opt.beginTime);
      console.log('actionPlay:name-->' + options.name);
      console.log('actionPlay:logOption-->' + opt.logOption);
      mediaObj.play(opt.url, opt.beginTime, options.name, 0, opt.logOption);
      console.log('playerCore ready end');
    };
    var delayPlay = function () {
      var arg = arguments;
      // console.log("playerCore delayPlay start")
      try {
        console.log('playerCore delayPlay mediaObj->' + (mediaObj));
        // console.log('playerCore delayPlay mediaObj->'+JSON.stringify(mediaObj));
        console.log('playerCore delayPlay typeof mediaObj.play->' + typeof mediaObj.play);
        console.log('playerCore delayPlay mediaObj.play->' + (mediaObj.play));
      } catch (e) {
        console.log('playerCore delayPlay error:' + e);
      }
      if (mediaObj && mediaObj.play) {
        actionPlayTimer = setTimeout(actionPlay, 0);
      } else {
        actionPlayTimer = setTimeout(function () {
          arg.callee();
        }, 50);
      }
      // console.log("playerCore delayPlay end")
    };
    delayPlay();
  };
  /**
 * set player to pause,return true or false.
  * @param {none}
 * @return {booleam}
 * @example var result=playerCore.pause();
 */
  playerCore.pause = function () {
    console.log('playerCore pause start');
    if (typeof mediaObj.pause == 'function' && currentState > state.stop) {
      pausetype = true;
      mediaObj.pause();
      changeState(state.pause);
      console.log('playerCore pause end');
      return true;
    } else {
      return false;
    }
    ;
  };
  // 返回暂停状态/
  playerCore.getpause = function () {
    return pausetype;
  }

  /**
* resume player after player is in pause state.can only be called after playerCore.pause().return true or false.
* @param {none}
* @return {booleam}
* @example var result=playerCore.resume();
 */
  playerCore.resume = function () {
    console.log('playerCore resume start');
    if (typeof mediaObj.resume == 'function' && pausetype) {
      pausetype = false;
      mediaObj.resume();
      changeState(state.play);
      console.log('playerCore resume end');
      return true;
    } else {
      return false;
    }
    ;
  };

  /**
* stop player.return true or false.
* @param {none}
* @return {booleam}
* @example var result=playerCore.stop();
*/
  playerCore.stop = function (isStatic) {
    /**
    *  isStatic=1切台静帧
     *  isStatic=2四川时移静帧
     *  isStatic=3广告播放结束后静帧，不支持静帧的话会保持黑色底板
     *  isStatic=4移除播放器及静帧效果，但不会产生onstop的回调
    * */
    console.log('playerCore stop start isStatic:' + isStatic);
    if (isStoppingFlag && isStatic && isStatic != 4) {
      // 已经调用过stop方法，并且档次调用是静帧调用时，不再调用stop方法
      console.log('playerCore stop->isStoppingFlag,return');
      return true;
    }
    isStoppingFlag = true;
    if (mediaObj && typeof mediaObj.stop == 'function') {
      if (actionPlayTimer) { clearTimeout(actionPlayTimer); }
      if (isStatic) {
        console.log('playerCore stop start ' + mediaObj.stopByFlag);
        if (mediaObj.stopByFlag && typeof mediaObj.stopByFlag == 'function') {
          console.log('playerCore stop start isStatic success');
          if (/^\d+$/.test(isStatic)) {
            console.log('playerCore stopByFlag(' + isStatic + ')');
            mediaObj.stopByFlag(isStatic);
          } else {
            mediaObj.stopByFlag(1);
          }
          // mediaObj.stopByFlag(1);
        } else {
          console.log('playerCore stop start isStatic failed');
          mediaObj.stop();
        }
      } else {
        console.log('playerCore stop start isStatic default');
        mediaObj.stop();
      }
      currentTime = 0;
      console.log('playerCore stop end');
      console.log('replay stop:typeof' + typeof opt.onStop);
      console.log('replay stop:typeof' + typeof onPlayForceStop)
      return true;
    } else {
      return false;
    }
    ;
  };
  /**
* seek time.
* @param {number}
* @return {booleam}
* @example var result=playerCore.seekByTime(0);
*/
  playerCore.seekByTime = function (seekTime) {
    console.log('playerCore seekByTime start');
    console.log('playerCore seekByTime seekTime -> ' + seekTime);
    if (typeof mediaObj.seekByTime == 'function' && digit.test(seekTime)) {
      console.log('playerCore:before seek,getCurrentTime==' + mediaObj.getCurrentTime());
      seekTime = parseInt(seekTime, 10);
      var seekResult = mediaObj.seekByTime(seekTime);
      console.log('playerCore:seek result is:' + seekResult);
      currentTime = mediaObj.getCurrentTime();
      console.log('playerCore seekByTime end');
      return true;
    } else {
      return false;
    }
  };
  /**
* set player display area.
* @param {number,number,number,number}
* @return {booleam}
* @example var result=playerCore.setDisplayArea(0,0,1280,720);
*/
  playerCore.setDisplayArea = function (x, y, w, h) {
    console.log('playerCore setDisplayArea start');
    if (currentState == state.stop || currentState == state.over || currentState == state.ready) {
      try {
        removeAllMediaPlayer();
        if (arguments.length > 0 && digit.test(x) && digit.test(y) && digit.test(w) && digit.test(h)) {
          createNewMediaPlayer({ 'x': x, 'y': y, 'w': w, 'h': h });
        } else {
          createNewMediaPlayer();
        }
        ;
        if (isHualuBox == true) {
          setElementArea(x, y, w, h);
          return mediaObj.setDisplayArea(x, y, w, h);
        }
        return true;
      } catch (err) {
        return false;
      }
      ;
    } else {
      if (typeof mediaObj.setDisplayArea == 'function') {
        if (arguments.length > 0 && digit.test(x) && digit.test(y) && digit.test(w) && digit.test(h)) {
          setElementArea(x, y, w, h);
          return mediaObj.setDisplayArea(x, y, w, h);
        } else {
          setElementArea(0, 0, 1280, 720);
          return mediaObj.setDisplayArea(0, 0, 1280, 720);
        }
        ;
      } else {
        return false;
      }
      ;
    }
    ;
    function setElementArea (_x, _y, _w, _h) {
      mediaObj.style.left = _x + 'px';
      mediaObj.style.top = _y + 'px';
      mediaObj.style.width = _w + 'px';
      mediaObj.style.height = _h + 'px';
    };
    console.log('playerCore setDisplayArea end');
  };

  playerCore.getState = function () {
    return currentState;
  };

  playerCore.getCurrentTime = function () {
    if (mediaObj.getCurrentTime) { currentTime = mediaObj.getCurrentTime(); }
    return currentTime || 0;
  };

  playerCore.getTotalTime = function () {
    totalTime = mediaObj.getTotalTime();
    return totalTime || 0;
  };

  playerCore.getBufferNum = function () {
    return bufferNumber
  };

  playerCore.getTimeout = function () {
    return opt.timeout;
  };

  playerCore.getUrl = function () {
    return opt.url;
  };

  playerCore.setHualuBox = function () {
    isHualuBox = true;
  };

  playerCore.setState = function (stat) {
    currentState = stat;
  };

  playerCore.supportStatic = function () {
    if (mediaObj.stopByFlag && typeof mediaObj.stopByFlag == 'function') {
      return true;
    } else {
      return false;
    }
  };
  return playerCore;
})();

function getmediaObjTest () {
  var testCount = 1, currentCount = 0;
  var totalTime = 10 * 60;
  var intervalTemp;
  var isStop = false;
  function autoPlay (me) {
    clearInterval(intervalTemp);
    intervalTemp = setInterval(function () {
      currentCount += 1;
      console.log('currenttime:' + currentCount);
      if (currentCount >= totalTime) {
        // currentCount=totalTime;
        // me.onPlayStop();
        // clearInterval(intervalTemp);
      }
    }, 1000);
  }
  return {
    play: function (url, beginTime, name, tag, options) {
      isStop = false;
      clearInterval(intervalTemp);
      currentCount = 0;
      var me = this;
      setTimeout(function () {
        if (isStop) return;
        me.onBufferingStart();
        setTimeout(function () {
          if (isStop) return;
          options = JSON.parse(options);
          if (!(options && options.type && options.type.indexOf('live') > -1)) {
            autoPlay(me);// 直播不走，点播走此逻辑
          }
          me.onPlayReady();
          me.onBufferingComplete();
        }, 1000);
      }, 1000);
    },
    pause: function () {
      clearInterval(intervalTemp);
    },
    resume: function () {
      autoPlay(this);
    },
    stop: function () {
      isStop = true;
      this.onPlayForceStop();
      clearInterval(intervalTemp);
    },
    getTotalTime: function () { return totalTime; },
    getCurrentTime: function () { return currentCount; },
    style: {},
    seekByTime: function (a) { currentCount = a; },
    setDisplayArea: function (x, y, w, h) { },
    sendVideoInfoBroadcast: function () { },
    // eslint-disable-next-line no-return-assign
    getBufferingProgress: function () { return testCount += 20; },
    onPlayReady: null,
    onPlayStop: null,
    onPlayForceStop: null,
    onPlayError: null,
    onBufferingStart: null,
    onBufferingComplete: null,
    destroy: function () {
      clearInterval(intervalTemp);
    }
  };
}

export default {
  getPlayCore: function () {
    return playerCore
  }
}
