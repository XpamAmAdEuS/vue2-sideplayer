import SidePlayer from './SidePlayer.vue'
import { VueConstructor } from 'vue'
import "./scss/index.scss";

export default {
    install (Vue: VueConstructor): void {
        Vue.component('SidePlayer', SidePlayer)
    },
}
