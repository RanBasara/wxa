(function(window){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    var ua = window.navigator.userAgent.toLowerCase();
    var isWX = ua.indexOf('micromessenger') !== -1;

    window.wxa = function(){
        this.source = context.createBufferSource();
        this.playtime = null;
        this.played = false;
        
        this.init = function(url,autoplay,loop){
            var _target = this;
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            request.onload = function () {
                if (request.status == 200) {
                    var audioData = request.response;
                    context.decodeAudioData(audioData, function (buffer) {
                        _target.source.buffer = buffer;
                        _target.source.connect(context.destination);
                        loop && (_target.source.loop = true)
                        // 判断微信浏览器
                        if(isWX){
                            autoplay && WeixinJSBridge.invoke('getNetworkType',_target.source.start(0,0));
                        }else{
                            _target.source.onstatechange = _target.onstatechange();
                            autoplay && _target.source.start(0,0);
                        }
                    }, function (e) {
                        console.log('Error decoding audio data:' + e);
                    });
                } else {
                    console.log('Audio didn\'t load successfully; error code:' + request.statusText);
                }
            };
            request.send();
        }

        this.onstatechange = function(){
            this.played = true;
        }

        this.stop = function(){
            this.played = false;
            this.source.stop();
        }

        this.pause = function(){
            this.source.context.suspend();
        }

        this.play = function(){
            if(this.played){
                this.source.context.resume();
            }else{
                this.source.start(0);
            }
        }

    };
    window.$WXA = new wxa();
})(window)