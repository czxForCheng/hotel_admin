<template>
  <div class="time-zoom">
   当前时区：{{timeZoomText}} {{timeStr}}
  </div>
</template>

<script setup lang="ts">
import useTimeStore from '@/stores/modules/timeZoom'
const timeStore = useTimeStore()
const timeZoomText = computed(() => timeStore.timeZoomText)
const timeZoomI:any = computed(() => timeStore.timeZoomI)
const timeStr = ref('')
let timer:any = null
const getLocalTime = (i: number) => {
  //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
  var d = new Date();
  //得到1970年一月一日到现在的秒数
  var len = d.getTime();
  //本地时间与GMT时间的时间偏移差
  var offset = d.getTimezoneOffset() * 60000;
  //得到现在的格林尼治时间
  var utcTime = len + offset;
  const nowTime = new Date(utcTime + 3600000 * i)
  const year = nowTime.getFullYear()
  let month:any = nowTime.getMonth() + 1
  month = month < 10 ? '0' + month : '' + month
  let day:any = nowTime.getDate()
  day = day < 10 ? '0' + day : '' + day
  let hour:any = nowTime.getHours()
  hour = hour < 10 ? '0' + hour : '' + hour
  let minutes:any = nowTime.getMinutes()
  minutes = minutes < 10 ? '0' + minutes : '' + minutes
  let seconds:any = nowTime.getSeconds()
  seconds = seconds < 10 ? '0' + seconds : '' + seconds
  timeStr.value = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  // return timeStr.value
}
// console.log("*******************东区时间************************************");
// console.log("零时区-伦敦时间：" + getLocalTime(0));
// console.log("东一区-柏林时间：" + getLocalTime(1));
// console.log("东二区-雅典时间：" + getLocalTime(2));
// console.log("东三区-莫斯科时间：" + getLocalTime(3));
// console.log("东四区-时间：" + getLocalTime(4));
// console.log("东五区-伊斯兰堡时间：" + getLocalTime(5));
// console.log("东六区-科伦坡时间：" + getLocalTime(6));
// console.log("东七区-曼谷时间：" + getLocalTime(7));
// console.log("东八区-北京时间：" + getLocalTime(8));
// console.log("东九区-东京时间：" + getLocalTime(9));
// console.log("东十区-悉尼时间：" + getLocalTime(10));
// console.log("东十二区-斐济时间：" + getLocalTime(12));
// console.log("*******************西区时间************************************");
// console.log("西十区-斐济时间：" + getLocalTime(-10));
// console.log("西九区-阿拉斯加时间：" + getLocalTime(-9));
// console.log("西八区-太平洋时间（美国和加拿大）：" + getLocalTime(-8));
// console.log("西七区-山地时间（美国和加拿大）：" + getLocalTime(-7));
// console.log("西六区-中部时间（美国和加拿大）：" + getLocalTime(-6));
// console.log("西五区-东部时间（美国和加拿大）：" + getLocalTime(-5));
// console.log("西四区-大西洋时间（加拿大）：" + getLocalTime(-4));
// console.log("西三区-巴西利亚时间：" + getLocalTime(-3));
const handleGetTime = async () => {
  await timeStore.getTimeZoom()
  timer = setInterval(() => {
    getLocalTime(timeZoomI.value)
  }, 1000)
}
handleGetTime()
watch(timeZoomText,(newvalue, oldvalue) => {
  if(oldvalue) {
    handleGetTime()
  }
})
onUnmounted(async () => {
  clearInterval(timer)
})


</script>