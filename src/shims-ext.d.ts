import SidePlayer from '@/SidePlayer.vue';

declare module 'vue/types/vue' {
    interface Vue {
        $sideplayer: SidePlayer;
        $route: VueRoute;
        $t: Function;
        $tc: Function;
    }

    interface VueRoute {
        path: string;
    }
}
