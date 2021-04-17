// @ts-nocheck
export default class VoicePlugin {
  static create(params) {
    return {
      name: 'voice',
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      instance: VoicePlugin,
    };
  }

  _onRedraw = () => this.render();

  _onPlay = () => this.setVol();

  _onReady = () => {
    const ws = this.wavesurfer;
    this.util = ws.util;
    ws.on('redraw', this._onRedraw);
    ws.on('play', this._onPlay);
    this.render();
  };

  constructor(params, ws) {
    this.container = 'string' == typeof params.container ? document.querySelector(params.container) : params.container;

    if (!this.container) {
      throw new Error('No container for wavesurfer voice');
    }

    this.wavesurfer = ws;
    this.util = ws.util;
    this.wrapper = null;
    this.params = params;
  }

  init() {
    this.bindChange();
    if (this.wavesurfer.isReady) {
      this._onReady();
    } else {
      this.wavesurfer.once('ready', this._onReady);
    }
  }

  /**
   * Destroy function used by the plugin API
   */
  destroy() {
    this.unAll();
    this.wavesurfer.un('redraw', this._onRedraw);
    this.wavesurfer.un('ready', this._onReady);
    if (this.wrapper && this.wrapper.parentNode) {
      this.wrapper.removeEventListener('change', this._onChange);
      this.wrapper.parentNode.removeChild(this.wrapper);
      this.wrapper = null;
    }
  }

  createWrapper() {
    this.container.innerHTML = '';
    this.wrapper = this.container.appendChild(document.createElement('input'));
    this.wrapper.classList.add('voice-input');
    this.wrapper.type = 'range';
    this.wrapper.id = '#voicerange';
    this.wrapper.style.width = '100%';
    this.wrapper.min = '0';
    this.wrapper.max = '1';
    this.wrapper.step = '0.01';
    this.wrapper.value = this.params.volume
    this.wavesurfer.setVolume(this.params.volume);

  }

  bindChange() {
    this._onChange = e => {
      this.wavesurfer.setVolume(e.target.value);
    };
    this.container.addEventListener('change', this._onChange);
  }

  setVol() {
    this.wavesurfer.setVolume(this.wrapper.value)
  }

  render() {
    //this.wavesurfer.setVolume(this.params.volume)
    if (!this.wrapper) {
      this.createWrapper();
    }
  }
}
