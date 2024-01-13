import { defineComponent } from 'vue'
export default defineComponent({
    template:`
        <div class="site__inform inform__error">
            <h3 class="inform__heading">Страничка не найдена.</h3>
            <div class="btn__group"><router-link to="/" class="btn">В начало</router-link></div>
        </div>
    `,

});