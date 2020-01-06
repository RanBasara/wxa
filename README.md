# -WXA

**h5音频播放，兼容微信浏览器，微信浏览器自动播放音频**

采用webAudio API解决同时播放多个声音，解决微信浏览器背景音乐不能自动播放问题

## 1.引入$WXA：

```
   <script src="_wxa.js"></script>

```

## 2配置音频：
```
   var source = $WXA.init(url, autoplay, loop);

```
- url：string 音频文件路径（绝对路径相对路径均可）;
- autoplay：Boolean 是否自动播放;
- loop:Boolean 播放后是否循环播放;

## 3.音频控制
```
   继续/重新播放音频： $WXA.play();
   暂停音频： $WXA.pause();
   停止音频： $WXA.stop();
```