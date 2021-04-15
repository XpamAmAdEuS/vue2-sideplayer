import SidePlayer from '@/SidePlayer.vue'
import { VueConstructor } from 'vue'


export default {
    install (Vue: VueConstructor): void {
        Vue.component('SidePlayer', SidePlayer)

        // Vue.mixin({
        //     beforeCreate () {
        //         const o = this.$options as Record<string, any>
        //     }
        // })
    },
}
