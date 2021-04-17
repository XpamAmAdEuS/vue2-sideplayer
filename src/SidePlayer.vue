<template>
  <div class="side-player d-none d-md-block" :class="{ open: state.open }">
    <div
      class="side-player-toggle side-player-spinner d-flex align-items-center justify-content-center"
      @click="toggle"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M481.44 0a29.38 29.38 0 0 0-9.25 1.5l-290.78 96C168.72 101.72 160 114 160 128v244.75C143 360 120.69 352 96 352c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V256l288-96v148.75C463 296 440.69 288 416 288c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V32c0-18.25-14.31-32-30.56-32zM96 480c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm320-64c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm64-289.72l-288 96V128h-.56v-.12L480 32.62z"
          class=""
        ></path>
      </svg>
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M481.44 0a29.38 29.38 0 0 0-9.25 1.5l-290.78 96C168.72 101.72 160 114 160 128v244.75C143 360 120.69 352 96 352c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V256l288-96v148.75C463 296 440.69 288 416 288c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V32c0-18.25-14.31-32-30.56-32zM96 480c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm320-64c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm64-289.72l-288 96V128h-.56v-.12L480 32.62z"
          class=""
        ></path>
      </svg>
    </div>

    <div class="side-player-content">
      <div class="text-center">
        {{ state.audio.artist }} - {{ state.audio.title }}
      </div>
      <div ref="containerRef"></div>
      <div id="io"></div>
      <div id="side"></div>
      <div id="controls" class="text-center"></div>
      <div id="voice" class="voice-range"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "@vue/composition-api";
import WaveSurfer, { WaveSurferParams } from "wavesurfer.js";

import CursorPlugin from "./plugins/cursor";
import SidePlugin from "./plugins/side";
import ControlsPlugin from "./plugins/controls";
import VoicePlugin from "./plugins/voice";

export default defineComponent({
  props: {
    authToken: {
      type: String,
      default: null,
    },
    volume: {
      type: Number,
      default: 0.5,
    },
    prev: { default: false, type: Boolean },
    next: { default: false, type: Boolean },
    audioContext: { default: null, type: AudioContext },
    audioScriptProcessor: { default: null, type: ScriptProcessorNode },
    audioRate: { default: 1, type: Number },
    autoCenter: { default: true, type: Boolean },
    autoCenterRate: { default: 5, type: Number },
    autoCenterImmediately: { default: false, type: Boolean },
    backend: { default: "WebAudio", type: String },
    backgroundColor: { default: null, type: String },
    barHeight: { default: 1, type: Number },
    barRadius: { default: 0, type: Number },
    barGap: { default: null, type: Number },
    barWidth: { default: null, type: Number },
    barMinHeight: { default: null, type: Number },
    container: { default: null, type: [String, HTMLElement] },
    cursorColor: { default: "#333", type: String },
    cursorWidth: { default: 1, type: Number },
    dragSelection: { default: true, type: Boolean },
    duration: { default: null, type: Number },
    fillParent: { default: true, type: Boolean },
    forceDecode: { default: false, type: Boolean },
    height: { default: 128, type: Number },
    hideScrollbar: { default: false, type: Boolean },
    interact: { default: true, type: Boolean },
    loopSelection: { default: true, type: Boolean },
    maxCanvasWidth: { default: 4000, type: Number },
    mediaControls: { default: false, type: Boolean },
    mediaType: { default: "audio", type: String },
    progressColor: { default: "#555", type: String },
    removeMediaElementOnDestroy: { default: true, type: Boolean },
    responsive: { default: false, type: Boolean },
    scrollParent: { default: false, type: Boolean },
    skipLength: { default: 2, type: Number },
    waveColor: { default: "#999", type: [String, CanvasGradient] },
  },
  setup(props) {
    const emitter: any = inject("emitter");

    const containerRef = ref(null);

    const params: WaveSurferParams = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      container: containerRef,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      backend: props.backend,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      waveColor: props.waveColor,
      progressColor: props.progressColor,
      scrollParent: props.scrollParent,
      barWidth: props.barWidth,
      hideScrollbar: props.hideScrollbar,
      barHeight: props.barHeight,
      responsive: props.responsive,
      cursorColor: props.cursorColor,
      cursorWidth: props.cursorWidth,
      mediaControls: props.mediaControls,
      xhr: {
        requestHeaders: [
          {
            key: "Authorization",
            value: "Bearer " + props.authToken,
          },
        ],
      },
      plugins: [
        CursorPlugin.create({
          showTime: true,
          customShowTimeStyle: {
            "background-color": "#000",
            color: "#fff",
            padding: "2px",
            "font-size": "10px",
          },
        }),
        // TimelinePlugin.create({
        //   container: '#io',
        // }),
        SidePlugin.create({
          container: "#side",
        }),
        ControlsPlugin.create({
          container: "#controls",
          prev: props.prev,
          next: props.next,
        }),

        VoicePlugin.create({
          container: "#voice",
          volume: props.volume,
        }),
      ],
    };

    const state = reactive({
      open: false,
      stopped: false,
      playing: false,
      paused: false,
      musicHash: null,
      index: null,
      audio: {
        type: Object,
        default: {
          artist: { type: String, default: "" },
          title: { type: String, default: "" },
        },
      },
      volume: props.volume,
      waveSurfer: { type: WaveSurfer, default: () => new WaveSurfer(params) },
    });

    emitter.on("loadMusic", (eventData: any) => {
      load(eventData);
    });

    emitter.on("loadNext", (eventData: any) => {
      loadNext(eventData);
    });

    emitter.on("musicToggle", () => musicToggle());
    emitter.on("play", () => play());
    emitter.on("stop", () => stop());

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer = new WaveSurfer(params);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.init();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.on("ready", () => {
        setVolume(state.volume);
        play();
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.on("pause", () => {
        emitter.emit("sidepause", { hash: state.musicHash, pause: true });
        state.playing = false;
        state.paused = true;
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.on("play", () => {
        emitter.emit("sideplaying", { hash: state.musicHash, playing: true });
        state.playing = true;
        state.paused = false;
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.on("finish", () => {
        emitter.emit("sidefinish", state.index);
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.on("prev", () => {
        emitter.emit("sideprev", state.index);
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.on("next", () => {
        emitter.emit("sidenext", state.index);
      });
    });

    onBeforeUnmount(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.destroy();
    });

    const musicToggle = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.playPause();
    };

    const play = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.play();
    };

    const setVolume = (data: any) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.setVolume(data);
    };

    const getVolume = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.getVolume();
    };

    const pause = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.pause();
    };

    const stop = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.stop();
      emitter.emit("sidestop", { hash: state.musicHash, stop: true });
      state.playing = false;
      state.paused = false;
      state.stopped = true;
      state.musicHash = null;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.audio = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        artist: { type: String, default: "" },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        title: { type: String, default: "" },
      };
    };

    const load = (data: any) => {
      state.musicHash = data.row.item.hash;
      state.index = data.row.index;
      state.audio = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        artist: data.row.item.artist,
        title: data.row.item.title,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.load(data.link);
    };

    const loadNext = (data: any) => {
      state.musicHash = data.hash;
      state.index = data.index;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.audio = { artist: data.artist, title: data.title };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.waveSurfer.load(data.link);
    };

    const toggle = () => {
      state.open = !state.open;
    };

    return {
      state,
      toggle,
      pause,
      play,
      stop,
      getVolume,
      containerRef,
    };
  },
});
</script>
