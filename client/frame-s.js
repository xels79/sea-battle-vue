(function(){
const addUserDialog={
    template:`<dialog-s
        title="Добавить пользователя"
        v-bind:dialogData="dialogData"
        :buttons="['ok']"
        @click-ok="onOk"
        @click-cansel="onCansel"
    />`,
    props:{
        userName:String
    },
    data:function(){
        return {
        dialogData:[{
                isStatic:false,
                label:'Введите имя игрока',
                value:this.userName
        }]
    }},
    methods:{
        onOk:function(e,e2){
            // const index = +e.srcElement.getAttribute('data-index');
            console.log(this,e, e2);
            // console.log(e.srcElement.value);
            // this.userName = e.srcElement.value;
        },
        onCansel:function(e,e2){
            console.log('cansel',e,e2);
        }
    },
    whatc:{
        dialogData:function(nV, oV){
            console.log(nV,oV);
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