<template>
  <div class="side-player d-none d-md-block" :class="{ open: state.open }">
    <div class="side-player-toggle side-player-spinner d-flex align-items-center justify-content-center" @click="toggle">
      <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
            fill="currentColor"
            d="M481.44 0a29.38 29.38 0 0 0-9.25 1.5l-290.78 96C168.72 101.72 160 114 160 128v244.75C143 360 120.69 352 96 352c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V256l288-96v148.75C463 296 440.69 288 416 288c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V32c0-18.25-14.31-32-30.56-32zM96 480c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm320-64c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm64-289.72l-288 96V128h-.56v-.12L480 32.62z"
            class=""
        ></path>
      </svg>
      <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
            fill="currentColor"
            d="M481.44 0a29.38 29.38 0 0 0-9.25 1.5l-290.78 96C168.72 101.72 160 114 160 128v244.75C143 360 120.69 352 96 352c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V256l288-96v148.75C463 296 440.69 288 416 288c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V32c0-18.25-14.31-32-30.56-32zM96 480c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm320-64c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm64-289.72l-288 96V128h-.56v-.12L480 32.62z"
            class=""
        ></path>
      </svg>
    </div>

    <div class="side-player-content">
      <div class="text-center">{{ state.audio.artist }} - {{ state.audio.title }}</div>
      <div ref="containerRef"></div>
      <div id="io"></div>
      <div id="side"></div>
      <div id="controls" class="text-center"></div>
      <div id="voice" class="voice-range"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeUnmount, onMounted, reactive, ref } from '@vue/composition-api';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import SidePlugin from './plugins/side';
import ControlsPlugin from './plugins/controls';
import VoicePlugin from './plugins/voice';

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
    backend: { default: 'WebAudio', type: [String] },
    backgroundColor: { default: null, type: String },
    barHeight: { default: 1, type: Number },
    barRadius: { default: 0, type: Number },
    barGap: { default: null, type: Number },
    barWidth: { default: null, type: Number },
    barMinHeight: { default: null, type: Number },
    container: { default: null, type: [String, HTMLElement] },
    cursorColor: { default: '#333', type: String },
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
    mediaType: { default: 'audio', type: String },
    progressColor: { default: '#555', type: String },
    removeMediaElementOnDestroy: { default: true, type: Boolean },
    responsive: { default: false, type: Boolean },
    scrollParent: { default: false, type: Boolean },
    skipLength: { default: 2, type: Number },
    waveColor: { default: '#999', type: [String, CanvasGradient] },
  },
  setup(props,instance) {
    const emitter = inject('emitter');

    const containerRef = ref(null);

    const params = {
      container: containerRef,
      backend: props.backend,
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
        cache: 'default',
        mode: 'cors',
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        referrer: 'client',
        requestHeaders: [
          {
            key: 'Authorization',
            value: 'Bearer ' + props.authToken,
          },
        ],
      },
      plugins: [
        CursorPlugin.create({
          showTime: true,
          customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '2px',
            'font-size': '10px',
          },
        }),
        // TimelinePlugin.create({
        //   container: '#io',
        // }),
        SidePlugin.create({
          container: '#side',
        }),
        ControlsPlugin.create({
          container: '#controls',
          prev: props.prev,
          next: props.next
        }),

        VoicePlugin.create({
          container: '#voice',
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
        default: () => {
          return { artist: '', title: '' };
        },
      },
      volume: props.volume,
      waveSurfer: null,
    });

    emitter.on('loadMusic', eventData => {
      load(eventData);
    });

    emitter.on('loadNext', eventData => {
      loadNext(eventData);
    });

    emitter.on('musicToggle', () => musicToggle());
    emitter.on('play', () => play());
    emitter.on('stop', () => stop());

    onMounted(() => {
      state.waveSurfer = new WaveSurfer(params);

      state.waveSurfer.init();

      state.waveSurfer.on('ready', () => {
        setVolume(state.volume);
        play();
      });

      state.waveSurfer.on('pause', () => {
        emitter.emit('sidepause', { hash: state.musicHash, pause: true });
        state.playing = false;
        state.paused = true;
      });

      state.waveSurfer.on('play', () => {
        emitter.emit('sideplaying', { hash: state.musicHash, playing: true });
        state.playing = true;
        state.paused = false;
      });

      state.waveSurfer.on('finish', () => {
        emitter.emit('sidefinish', state.index);
      });

      state.waveSurfer.on('prev',  (controls)=> {

        emitter.emit('sideprev', state.index);
      });

      state.waveSurfer.on('next',  (controls)=> {
        emitter.emit('sidenext', state.index);
      });



    });

    onBeforeUnmount(() => {
      state.waveSurfer.destroy();
    });

    const musicToggle = () => {
      state.waveSurfer.playPause();
    };

    const play = () => {
      state.waveSurfer.play();
    };

    const setVolume = data => {
      state.waveSurfer.setVolume(data);
    };

    const getVolume = () => {
      state.waveSurfer.getVolume();
    };

    const pause = () => {
      state.waveSurfer.pause();
    };

    const stop = () => {
      state.waveSurfer.stop();
      emitter.emit('sidestop', { hash: state.musicHash, stop: true });
      state.playing = false;
      state.paused = false;
      state.stopped = true;
      state.musicHash = null;
      state.audio = { artist: '', title: '' };
    };

    const load = data => {
      state.musicHash = data.row.item.hash;
      state.index = data.row.index;
      state.audio = { artist: data.row.item.artist, title: data.row.item.title };
      state.waveSurfer.load(data.link);
    };

    const loadNext = data => {
      state.musicHash = data.hash;
      state.index = data.index;
      state.audio = { artist: data.artist, title: data.title };
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
      containerRef,
    };
  },
});
</script>

<style lang="scss">
.side-player {
  width: 60%;
  right: -60%;
  padding: 0;
  background-color: white;
  z-index: 1051;
  position: fixed;
  top: 60%;
  bottom: 0;
  max-height: 25%;
  height: 0;
  transition: right 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);
  backface-visibility: hidden;
  border-left: 1px solid rgba(black, 0.05);

  &.open {
    box-shadow: 0 15px 30px 0 rgba(black, 0.11), 0 5px 15px 0 rgba(black, 0.08);
    right: 0;
  }

  // customizer toggle icon
  .side-player-toggle {
    background: #000000ff;
    color: #ffffffff !important;
    display: block;
    box-shadow: -3px 0px 8px rgba(#000000ff, 0.1);
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    position: absolute;
    top: 50%;
    width: 38px;
    height: 68px;
    left: -39px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    align-items: center !important;

    svg {
      animation-duration: 6500ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    svg:first-of-type {
      animation-name: spin;
    }

    svg:last-of-type {
      animation-name: spin-reverse;
    }
  }

  .voice-range {
    padding: 5px 1rem;
    background-color: #fff;
    border: 1px solid #d8d6de;
    border-radius: 0.357rem;
  }

  .side-player-spinner {
    border-radius: 50% 0 0 50%;
    line-height: initial;
    box-shadow: -1px 0 8px #c1ccd3;
    background-color: black;
  }

  .side-player-content {
    box-shadow: -1px 0 8px #c1ccd3;
    border-radius: 0;
    background-color: #f5f5f5;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-reverse {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-360deg);
    }
  }

  .align-items-center {
    -ms-flex-align: center !important;
    align-items: center !important;
  }

  .d-none {
    display: none !important;
  }

  .d-md-block {
    display: block !important;
  }

  .justify-content-center {
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }
  .text-center {
    text-align: center !important;
  }

  .d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
  }
}
</style>
