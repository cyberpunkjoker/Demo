<template>
  <div>
    <p>video 标签</p>
    <video 
        controls 
        loop width="400" 
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
    >
      <p>当前浏览器不支持video标签</p>>
    </video>
  </div>
</template>

<script>
export default {
   
   // 强行设置控件显示
    //  this.$refs.myVideo.addEventListener(
    //     'timeupdate',
    //     function(event) {
    //       that.$refs.myVideo.focus()
    //       event.target.setAttribute('controls', 'controls')
    //     },
    //     false
    //   )
}
</script>

<style lang="less" scoped>
	// //全屏按钮
    // video::-webkit-media-controls-fullscreen-button {
    //     display: none;
    // }
    // //播放按钮
    // video::-webkit-media-controls-play-button {
    //     display: none;
    // }
    // //进度条
    // video::-webkit-media-controls-timeline {
    //     display: none;
    // }
    // //观看的当前时间
    // video::-webkit-media-controls-current-time-display{
    //     display: none;            
    // }
    // //剩余时间
    // video::-webkit-media-controls-time-remaining-display {
    //     display: none;            
    // }
    // //音量按钮
    // video::-webkit-media-controls-mute-button {
    //     display: none;            
    // }
    // video::-webkit-media-controls-toggle-closed-captions-button {
    //     display: none;            
    // }
    // //音量的控制条
    // video::-webkit-media-controls-volume-slider {
    //     display: none;            
    // }
    // //所有控件
    // video::-webkit-media-controls-enclosure{ 
    //     display: none;
    // }
</style>