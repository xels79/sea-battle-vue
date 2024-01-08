Vue.component('control-block',{
    template:`
        <div class="control-block">
            <template v-if="element.isStatic">
                <p class="control__text">{{ element.value }}</p>
            </template>
            <template v-else>
                <label v-if="element.label" class="control__label">{{ element.label }}</label>
                <input type="text" class="control__input" v-model="element.value"/>
            </template>
        </div>
    `,
    props:{
        element:{
            type:Object,
            default:function(){return {};}
        },
    }
});
Vue.component('dialog-s',{
    template:`
        <div class="dialog">
        <div class="dialog__heading">
        <div class="dialog__title">{{title}}</div>
            <div v-if="showCloseButton" class="dialog__close-button"></div>
        </div>
        <div class="dialog__body">
            <control-block 
                v-for="el in dialogData" 
                :key="el.type"
                v-bind:element="el"
            />
        </div>
        <div class="dialog__footer">footer</div>
        </div>
    `,
    props:{
        showCloseButton:{
            type:Boolean,
            default:true
        },
        title:String,
        dialogData:{
            type:Array,
            default:function(){return [];}
        }
    },
});