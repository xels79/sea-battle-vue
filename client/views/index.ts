import { defineComponent } from 'vue';
import {SAnyJSon ,IResponse} from '../../server/data.interfacec'
export default defineComponent({
    template:`
        <div class="bunner"><div class="loader"></div></div>
    `,
    mounted:function(){
        fetch('/',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({})
        })
        .then((response:Response)=> response.json())
        .then((result:IResponse)=>{
            console.log(result);
            // this.respondToRouteChanges=false;
            this.$router.replace(result.action.name);
        });    
    },

});