import dialog_s from '../dialog-s';
import { defineComponent } from 'vue';
const adduserView=defineComponent({
    components:{
        "dialog-s":dialog_s
    },
    template:`<dialog-s
        title="Добавить пользователя"
        v-bind:dialogData="dialogData"
        :buttons="['ok']"
        v-bind:showBunner="showBunner"
        @click-ok="onOk"
        @click-cansel="onCansel"
    />`,
    userName:'',
    props:{
        userName:String,
        showBunner:Boolean
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
        onOk:function(e:any,e2:any){
            // const index = +e.srcElement.getAttribute('data-index');
            console.log(this,e, e2);
            console.log(this.$route);
            this.$router.replace('/selectaponent');
            // console.log(e.srcElement.value);
            // this.userName = e.srcElement.value;
        },
        onCansel:function(e:any,e2:any){
            console.log('cansel',e,e2);
        }
    },
});
export default adduserView;