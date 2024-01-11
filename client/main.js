//  import { Vue } from 'vue';
// import "../css/style.css";
// import "../css/console.css";
import { createApp, ref }from 'vue';
import frame_s  from './frame-s';
createApp({
    components:{
        "frame-s":frame_s
    },
    // setup() {
    //   const message = ref('Hello Vue!')
    //   return {
    //     message
    //   }
    // }
  }).mount('#app')