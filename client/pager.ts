import { defineComponent } from 'vue';
export default defineComponent({
    template:`<template>
    </template>`,
    beforeMount() {
        console.log('pager', this);
    },
});