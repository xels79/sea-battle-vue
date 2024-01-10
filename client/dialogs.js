const dialog_s={
    template:`
        <div class="dialog">
        <div class="dialog__heading">
        <div class="dialog__title">{{title}}</div>
            <div v-if="showCloseButton" class="dialog__close-button" @click.prevent="$emit('click-cansel', $event, dialogData)"></div>
        </div>
        <div class="dialog__body">
            <template v-for="(element, index) in dialogData">
                <template v-if="element.isStatic">
                    <p class="control__text">{{ element.value }}</p>
                </template>
                <template v-else>
                    <label v-if="element.label" class="control__label">{{ element.label }}</label>
                    <input :data-index="index" type="text" class="control__input" v-model="element.value" @change="onChange"/>
                </template>
            </template>
        </div>
        <div v-if="showOk || showCansel" class="dialog__footer">
            <div class="btn__group">
                <a v-if="showOk" href="#" class="btn" @click.prevent="$emit('click-ok', $event, dialogData)">Продолжить</a>
                <a v-if="showCansel" href="#" class="btn" @click.prevent="$emit('click-cansel', $event, dialogData)">Отменить</a>
            </div>
        </div>
        </div>
    `,
    props:{
        title:String,
        dialogData:{
            type:Array,
            default:function(){return [];}
        },
        buttons:{
            type:Array,
            default:()=>[]
        }
    },
    data:function(){
        const retVal={ showOk:false, showCansel:false, showCloseButton:false };
        this.buttons.forEach(element => {
            switch (element){
                case 'ok':
                    retVal.showOk = true;
                    break;
                case 'cansel':
                    retVal.showCansel = true;
                case 'close':
                    retVal.showCloseButton = true;
            }
        });
        return retVal;
    },
    methods:{
        onChange:function(e,e2){
            const index = +e.srcElement.getAttribute('data-index');
            this.dialogData[index].value = e.srcElement.value;
        }
    }

};
export default dialog_s;