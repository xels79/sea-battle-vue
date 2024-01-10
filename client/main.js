// import Vue from 'vue';
import frame_s from './frame-s';
const Vue = require('vue');
const { createApp } = Vue;
// new Vue({el:'#app'});
createApp({
    components:{
        "frame-s":frame_s
    },
    el:'#app'
});