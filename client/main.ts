//  import { Vue } from 'vue';
// import "../css/style.css";
// import "../css/console.css";
import { createApp, ref }from 'vue';
// import frame_s  from './frame-s';
import index from './views/index';
import adduserView from './views/adduser';
import selectAponetView from './views/selectApponent';
import notFount404 from './views/notfound404';
import { createRouter, RouterOptions, createWebHashHistory } from 'vue-router';


const router = createRouter({
    routes: [
        { path: '/', component: index },
        { path: '/adduser', component: adduserView },
        { path: '/selectaponent', component: selectAponetView },
        { path: '/:pathMatch(.*)*', component: notFount404 }
    ],
    history:createWebHashHistory()
});
createApp({}).use(router).mount('#app');

