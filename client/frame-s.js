(function(){
const addUserDialog={
    template:`<dialog-s  v-bind:showCloseButton="false" v-bind:dialogData="dialogData"/>`,
    props:{
        userName:String
    },
    data:function(){
        console.log(this);
        return {
        dialogData:[{
                isStatic:false,
                label:'Введите имя игрока',
                value:this.userName
        }]
    }},
    watch:{
        dialogData:function(nV,oV){
            console.log(nV);
        }
    }
}
Vue.component('frame-s',{
    components:{addUserDialog},
    template:`
        <div class="frame">
        <addUserDialog v-if="showDialog" v-bind:userName="userName" title="Заголовок"/>
        <p>{{ userName }}</p>
        <button v-on:click="showDialog = !showDialog">Переключить</button>
        </div>
    `,
    props:['msg'],
    data:function(){return {
        showDialog:true,
        userName:'test'
    };},
});
})();