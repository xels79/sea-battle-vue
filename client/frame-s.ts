import dialog_s from './dialog-s';
import {SAnyJSon} from '../server/data.interfacec.js'
const addUserDialog={
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
            // console.log(e.srcElement.value);
            // this.userName = e.srcElement.value;
        },
        onCansel:function(e:any,e2:any){
            console.log('cansel',e,e2);
        }
    },
}
const frame_s = {
    mainBunner:true,
    showAddUserDialog:false,
    components:{addUserDialog},
    template:`
        <div class="frame">
            <addUserDialog v-if="showAddUserDialog" v-bind:showBunner="showDialogBunner" v-bind:userName="userName" title="Заголовок"/>
            <p>{{ userName }}</p>
            <button v-on:click="showAddUserDialog = !showAddUserDialog">Переключить</button>
            <div v-if="mainBunner" class="bunner"><span class="loader"></span></div>
        </div>
    `,
    data:function(){return {
        showAddUserDialog:false,
        showDialogBunner:false,
        mainBunner:true,
        userName:'test'
    };},
    mounted(){
        console.log(this);
        fetch('/',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({})
        })
        .then((response:Response)=> response.json())
        .then((result:SAnyJSon)=>{
            this.mainBunner=false;
            this.showAddUserDialog = true;
            console.log(result);
        });
    }
};
export default frame_s;