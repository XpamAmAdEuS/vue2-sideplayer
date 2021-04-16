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
    this.props = params;
    this.wrapper = null;
    this.playpause = null;
    this.stop = null;
    this.forward = null;
    this.backward = null;
    this.next = null;
    this.prev = null;
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
    this.wrapper.style.paddingBottom = '5px';

    const props = this.props;

    this.backward = this.wrapper.appendChild(document.createElement('a'));
    this.backward.style.marginRight = '20px';
    this.backward.style.marginLeft = '20px';
    this.backward.innerHTML =
        '<svg  aria-hidden="true" id="#backward" style="color: rgb(0,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
        '<path fill="currentColor" d="M12 447h8c6.6 0 12-5.4 12-12V277.3c.9 1 1.9 2 3 2.9l200.5 159.4c20.6 17.2 52.5 2.8 52.5-24.6V297.2l171.5 142.4c20.6 17.2 52.5 2.8 52.5-24.6V95c0-27.4-31.9-41.8-52.5-24.6L288 213.9V95.1c0-27.4-31.9-41.8-52.5-24.6L35 231c-1.1.9-2.1 1.9-3 2.9V75c0-6.6-5.4-12-12-12h-8C5.4 63 0 68.4 0 75v360c0 6.6 5.4 12 12 12zm280.5-191.4l.2-.1.2-.1L480 95v320L292.7 255.8l-.1-.1-.1-.1zM61 255.2l194.8-160 .1-.1.1-.1v320l-.1-.1-.1-.1L61 256v-.8z"></path></svg>';

    if (props.prev) {
      this.prev = this.wrapper.appendChild(document.createElement('a'));
      this.prev.style.marginRight = '20px';
      this.prev.style.marginLeft = '20px';
      this.prev.innerHTML =
          '<svg  aria-hidden="true" id="#prev" style="color: rgb(0,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">' +
          '<path fill="currentColor" d="M76 479h8c6.6 0 12-5.4 12-12V276.7c1.1 1.2 2.2 2.4 3.5 3.4l232 191.4c20.6 17.2 52.5 2.8 52.5-24.6V63c0-27.4-31.9-41.8-52.5-24.6L99.5 231c-1.3 1.1-2.4 2.2-3.5 3.4V43c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v424c0 6.6 5.4 12 12 12zm40.5-223.4L351.8 63.2l.1-.1.1-.1v384l-.1-.1-.2-.1-235.2-191.2z"></path></svg>';
    }
    this.stop = this.wrapper.appendChild(document.createElement('a'));
    this.stop.style.marginRight = '20px';
    this.stop.style.marginLeft = '20px';
    this.stop.id = '#stop';

    this.stop.innerHTML =
        '<svg  aria-hidden="true" id="#stop" style="color: rgb(255,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">' +
        '<path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z">' +
        '</path></svg>';

    this.playpause = this.wrapper.appendChild(document.createElement('a'));
    this.playpause.style.marginRight = '20px';
    this.playpause.style.marginLeft = '20px';

    if (props.next) {
      this.next = this.wrapper.appendChild(document.createElement('a'));
      this.next.style.marginRight = '20px';
      this.next.style.marginLeft = '20px';
      this.next.id = '#next';
      this.next.innerHTML =
          '<svg  aria-hidden="true" id="#next" style="color: rgb(0,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">' +
          '<path fill="currentColor" d="M372 31h-8c-6.6 0-12 5.4-12 12v190.3c-1.1-1.2-2.2-2.4-3.5-3.4l-232-191.4C95.9 21.3 64 35.6 64 63v384c0 27.4 31.9 41.8 52.5 24.6l232-192.6c1.3-1.1 2.4-2.2 3.5-3.4V467c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V43c0-6.6-5.4-12-12-12zm-40.5 223.4L96.2 446.8l-.1.1-.1.1V63l.1.1.2.1 235.2 191.2z"></path></svg>';
    }
    this.forward = this.wrapper.appendChild(document.createElement('a'));
    this.forward.style.marginRight = '20px';
    this.forward.style.marginLeft = '20px';
    this.forward.innerHTML =
        '<svg  aria-hidden="true" id="#forward" style="color: rgb(0,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
        '<path fill="currentColor" d="M500 63h-8c-6.6 0-12 5.4-12 12v157.7c-.9-1-1.9-2-3-2.9L276.5 70.4C255.9 53.3 224 67.6 224 95v117.8L52.5 70.4C31.9 53.3 0 67.6 0 95v320c0 27.4 31.9 41.8 52.5 24.6L224 296.2V415c0 27.4 31.9 41.8 52.5 24.6L477 279c1.1-.9 2.1-1.9 3-2.9V435c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V75c0-6.6-5.4-12-12-12zM219.5 254.4l-.2.1-.2.1L32 415V95l187.3 159.2.1.1.1.1zm231.5.5l-194.8 160-.1.1h-.1V95l.1.1.1.1L451 254v.9z"></path></svg>';
  }

  bindClick() {
    this._onClick = e => {
      const target = e.target.id;

      if (target.toString() === '#play') {
        this.wavesurfer.playPause();
      }

      if (target.toString() === '#stop') {
        this.wavesurfer.stop();
      }

      if (target.toString() === '#prev') {
        this.wavesurfer.fireEvent('prev', this);
      }

      if (target.toString() === '#next') {
        this.wavesurfer.fireEvent('next', this);
      }

      if (target.toString() === '#forward') {
        this.wavesurfer.skipForward();
      }

      if (target.toString() === '#backward') {
        this.wavesurfer.skipBackward();
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
        '<svg aria-hidden="true" id="#play" style="color: #28c76f;height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zm-16.2 55.1l-352 208C45.6 483.9 32 476.6 32 464V47.9c0-16.3 16.4-18.4 24.1-13.8l352 208.1c10.5 6.2 10.5 21.4.1 27.6z"></path></svg>';
  }

  updatePlaying() {
    this.playpause.innerHTML =
        '<svg aria-hidden="true" id="#play" style="color: rgb(255, 159, 67);height: 1.5em;"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M48 479h96c26.5 0 48-21.5 48-48V79c0-26.5-21.5-48-48-48H48C21.5 31 0 52.5 0 79v352c0 26.5 21.5 48 48 48zM32 79c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V79zm272 400h96c26.5 0 48-21.5 48-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48zM288 79c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16V79z"></path></svg>';
  }
}
