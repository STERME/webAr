
import WebAR from './webar';
import './preload';
// import VConsole from './vconsole.min';
// import App from './farmerapp.js'
// import * as THREE from '../libs/three.module.js';
// 
//
// new VConsole();

const ua = navigator.userAgent.toLowerCase(),
    isAndroid = /android/i.test(ua),
    isIphone = /(iPhone|iPad|iPod|iOS)/i.test(ua),
    isWeChat = /MicroMessenger/i.test(ua);

const winHeight = window.innerHeight;
const webAR = new WebAR();
const startPanel = $(".openPanel");
const scanPanel = $(".scan-panel");
const btnOpenCamera = $("#openCamera");
const video = $('#video')[0];
const scanButon = $(".scan-button");
const introPanel = $(".intro");
const moreButton = $(".more-button");
const videoPanel = $(".video-panel");
const returnVideo = $(".returnVideo");

//是否支持
let supportVideo = true;

//点击开启
btnOpenCamera.on('click', function() {
  startPanel.hide();
  if(supportVideo){
    scanPanel.show();
  }else{
    //播放视频
    videoPanel.show();
  }
});


$("#threecontainer").hide();
$("#myvideo").hide();
/*
 * 支持打开摄像头
 */
function success() {
    //显示启动页
    startPanel.show();
}
/*
 * 不支持开启摄像头
 */
function fail() {

    //如果是iphone和weiChat 显示引导页
    if (isIphone && isWeChat) {
        $(".ioswxPanel").show();
        return;
    }
    //不支持
    supportVideo = false;

}

//识别
function scan() {
    scanPanel.hide();
    videoPanel.show();
    //loadThree();
}

let deviceId; //指定调用设备ID
// 列出视频设备
webAR.listCamera().then((videoDevice) => {
    console.log(videoDevice);
    //测了一些手机，android后置摄像头应该是数组的最后一个，苹果是第一个

    if (isAndroid) {
        deviceId = videoDevice[videoDevice.length - 1].deviceId;
    } else if (isIphone) {
        deviceId = videoDevice[0].deviceId;
    }

    success();
    //检查成功直接开启
    openCamera();

}).catch((err) => {

    fail();
    //
});
function openCamera(){

  webAR.openCamera(video, deviceId).then((msg) => {
      // 打开摄像头成功
      // 将视频铺满全屏(简单处理)
      window.setTimeout(() => {
          let videoWidth = video.offsetWidth;
          let videoHeight = video.offsetHeight;
          if (window.innerWidth < window.innerHeight) {
              // 竖屏
              if (videoHeight < window.innerHeight) {
                  video.setAttribute('height', window.innerHeight.toString() + 'px');
              }
          } else {
              // 横屏
              if (videoWidth < window.innerWidth) {
                  video.setAttribute('width', window.innerWidth.toString() + 'px');
              }
          }

      }, 500);



  }).catch((err) => {
      alert('打开视频设备失败');
  });
}


//对准完成按钮
scanButon.on('click', function() {
    scan();
});
//more
moreButton.on('click',function(){
  videoPanel.hide();
  introPanel.show();
})
//
returnVideo.on('click',function(){
  videoPanel.show();
  introPanel.hide();
})

//loadThree();
function loadThree() {
    $("#threecontainer").show();
    $("#myvideovideo").show();
    var oVideo = document.getElementById('myvideo');
    oVideo.play();
    const app = new App();
    app.update();
    console.log("started lf app!");
}
