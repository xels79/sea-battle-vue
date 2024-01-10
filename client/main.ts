//  import { Vue } from 'vue';
import { createApp, ref }from 'vue';
import frame_s  from './frame-s';
//const Vue = require('vue');
// const app1 = new Vue({
//     el:'#app',
//     components:{
//         "frame-s":frame_s
//     }
// });
// Vue.component('test-s',{
//     template:`
//         <p>{{ msg }}</p>
//     `,
//     prop:{
//         msg:String
//     }
// });
// const { createApp } = Vue;
// // new Vue({el:'#app'});

// createApp({
//     components:{
//         "frame-s":frame_s
//     },
//     el:'#app'
// });

createApp({
    components:{
        "frame-s":frame_s
    },
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')