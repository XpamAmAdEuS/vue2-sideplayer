<template>
  <div class="theme-helper" :class="{ 'theme-helper-opened': state.open }">
    <section class="widget theme-helper-content">
      <header class="theme-helper-header d-flex">
        <div class="theme-helper-toggler" @click="toggle">
          <div class="theme-helper-spinner text-white">
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
        </div>
        <h6>{{ state.audio.artist }} - {{ state.audio.title }}</h6>
      </header>
      <div>
        <div id="waveform"></div>
        <div id="io"></div>
        <div id="side"></div>
        <div id="controls" class="wrapper text-center"></div>
        <div id="voice" class="voice-range"></div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeUnmount, onMounted, reactive } from '@vue/composition-api';
import  { Emitter } from 'mitt';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import SidePlugin from './plugins/side';
import ControlsPlugin from './plugins/controls';
import VoicePlugin from './plugins//voice';


export default defineComponent({
  props:{
    authToken: {
      type:String,
      default: null
    }
  },
  setup(props) {
    const emitter: Emitter = inject('emitter');
    const state = reactive({
      open: false,
      stopped: false,
      playing: false,
      paused: false,
      musicHash: {},
      audio: {
        type: Object,
        default: () => {
          return { artist: '', title: '' };
        },
      },
      waveSurfer: null,
    });


    emitter.on('loadMusic', eventData => {
      load(eventData);
    });

    emitter.on('musicToggle', () => musicToggle());
    emitter.on('play', () => play());
    emitter.on('stop', () => stop());

    onMounted(() => {
      state.waveSurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        //barWidth: 1,
        responsive: true,
        xhr: {
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
          }),

          VoicePlugin.create({
            container: '#voice',
          }),
        ],
      });

      state.waveSurfer.on('ready', () => {
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
      state.musicHash = data.hash;
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
    };
  },
});
</script>

<style lang="scss">
.theme-helper {
  position: fixed;
  right: -624px;
  top: 56%;
  bottom: 0;
  max-height: 25%;
  height: 0;
  z-index: 100;
  -webkit-transition: right 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &.theme-helper-opened {
    right: 0;
  }

  .theme-helper-toggler {
    width: 38px;
    height: 38px;
    top: 55%;
    margin-left: -39px;
    cursor: pointer;
    position: absolute;
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

  .theme-helper-spinner {
    border-radius: 50% 0 0 50%;
    padding: 1rem * 0.8 1rem / 2 1rem * 0.8 1rem;
    line-height: initial;
    box-shadow: -1px 0 8px #c1ccd3;
    background-color: black;
  }

  .theme-helper-header {
    h6 {
      margin: auto;
    }
  }

  .theme-helper-content {
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
}

.voice-range {
  padding: 5px 1rem;
  background-color: #fff;
  border: 1px solid #d8d6de;
  border-radius: 0.357rem;
  width: 620px;
}
</style>
