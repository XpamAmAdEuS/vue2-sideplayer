export default class ControlsPlugin {
  static create(params) {
    return {
      name: 'controls',
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      instance: ControlsPlugin,
    };
  }

  _onRedraw = () => this.render();

  _onPause = () => this.updatePaused();

  _onPlay = () => this.updatePlaying();

  _onReady = () => {
    const ws = this.wavesurfer;
    ws.on('redraw', this._onRedraw);
    ws.on('pause', this._onPause);
    ws.on('play', this._onPlay);
    this.render();
  };

  constructor(params, ws) {
    this.container = 'string' == typeof params.container ? document.querySelector(params.container) : params.container;

    if (!this.container) {
      throw new Error('No container for wavesurfer controls');
    }

    this.wavesurfer = ws;
    this.wrapper = null;
    this.playpause = null;
    this.stop = null;
  }

  init() {
    // Check if ws is ready
    this.bindClick();
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
      this.wrapper.removeEventListener('click', this._onClick);
      this.wrapper.parentNode.removeChild(this.wrapper);
      this.wrapper = null;
    }
  }

  createWrapper() {
    this.container.innerHTML = '';
    this.wrapper = this.container.appendChild(document.createElement('div'));
    this.wrapper.classList.add('btn-group');
    this.stop = this.wrapper.appendChild(document.createElement('button'));
    this.stop.style.marginRight = '10px';
    this.stop.id = '#stop';
    this.stop.role = 'button';

    this.stop.classList.add('btn');
    this.stop.classList.add('btn-default');

    this.stop.innerHTML =
      '<svg  aria-hidden="true" id="#stop1" style="color: rgb(255,0,0);height: 1.5em;" focusable="false"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z"></path></svg>';

    this.playpause = this.wrapper.appendChild(document.createElement('button'));
    this.playpause.style.marginRight = '10px';
    this.playpause.id = '#play';
    this.playpause.role = 'button';
    this.playpause.classList.add('btn');
    this.playpause.classList.add('btn-default');
  }

  bindClick() {
    this._onClick = e => {
      const target = e.target.id;

      if (target.toString() === 'play') {
        this.wavesurfer.playPause();
      }

      if (target.toString() === '#play') {
        this.wavesurfer.playPause();
      }

      if (target.toString() === '#play1') {
        this.wavesurfer.playPause();
      }

      if (target.toString() === '#pause') {
        this.wavesurfer.playPause();
      }

      if (target.toString() === '#stop') {
        this.wavesurfer.stop();
      }

      if (target.toString() === '#stop1') {
        this.wavesurfer.stop();
      }
    };
    this.container.addEventListener('click', this._onClick);
  }

  render() {
    if (!this.wrapper) {
      this.createWrapper();
    }
  }

  updatePaused() {
    this.playpause.innerHTML =
      '<svg aria-hidden="true" id="#play1" style="color: #28c76f;height: 1.5em;" focusable="false"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zm-16.2 55.1l-352 208C45.6 483.9 32 476.6 32 464V47.9c0-16.3 16.4-18.4 24.1-13.8l352 208.1c10.5 6.2 10.5 21.4.1 27.6z"></path></svg>';
  }

  updatePlaying() {
    this.playpause.innerHTML =
      '<svg aria-hidden="true" id="#pause" style="color: rgb(255, 159, 67);height: 1.5em;" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M48 479h96c26.5 0 48-21.5 48-48V79c0-26.5-21.5-48-48-48H48C21.5 31 0 52.5 0 79v352c0 26.5 21.5 48 48 48zM32 79c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V79zm272 400h96c26.5 0 48-21.5 48-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48zM288 79c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16V79z"></path></svg>';
  }
}
