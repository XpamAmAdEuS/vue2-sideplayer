// @ts-nocheck
export default class SidePlugin {
  static create(params) {
    return {
      name: 'side',
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      instance: SidePlugin,
    };
  }

  // event handlers
  _onScroll = () => {
    if (this.wrapper && this.drawer.wrapper) {
      this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft;
    }
  };

  /**
   * @returns {void}
   */
  _onRedraw = () => this.render();

  _onAudioProcess = () => this.updateNowPosition();

  _onReady = () => {
    const ws = this.wavesurfer;
    this.drawer = ws.drawer;

    // add listeners
    ws.drawer.wrapper.addEventListener('scroll', this._onScroll);
    ws.on('redraw', this._onRedraw);
    ws.on('zoom', this._onZoom);
    ws.on('audioprocess', this._onAudioProcess);

    this.render();
  };

  /**
   * @param {object} e Click event
   */
  _onWrapperClick = e => {
    e.preventDefault();
    const relX = 'offsetX' in e ? e.offsetX : e.layerX;
    this.fireEvent('click', relX / this.wrapper.scrollWidth || 0);
  };

  constructor(params, ws) {
    this.container = 'string' == typeof params.container ? document.querySelector(params.container) : params.container;

    if (!this.container) {
      throw new Error('No container for wavesurfer side');
    }

    this.wavesurfer = ws;
    this.util = ws.util;
    this.params = Object.assign(
        {},
        {
          height: 20,
          notchPercentHeight: 90,
          labelPadding: 5,
          unlabeledNotchColor: '#c0c0c0',
          primaryColor: '#000',
          secondaryColor: '#c0c0c0',
          primaryFontColor: '#000',
          secondaryFontColor: '#000',
          fontFamily: 'Arial',
          fontSize: 10,
          duration: null,
          zoomDebounce: false,
          formatTimeCallback: this.defaultFormatTimeCallback,
          timeInterval: this.defaultTimeInterval,
          primaryLabelInterval: this.defaultPrimaryLabelInterval,
          secondaryLabelInterval: this.defaultSecondaryLabelInterval,
          offset: 0,
        },
        params
    );

    this.wrapper = null;
    this.totalduration = null;
    this.nowtime = null;
    /**
     * This event handler has to be in the constructor function because it
     * relies on the debounce function which is only available after
     * instantiation
     *
     * Use a debounced function if `params.zoomDebounce` is defined
     *
     * @returns {void}
     */
    this._onZoom = this.params.zoomDebounce
        ? this.wavesurfer.util.debounce(() => this.render(), this.params.zoomDebounce)
        : () => this.render();
  }

  /**
   * Initialisation function used by the plugin API
   */
  init() {
    // Check if ws is ready
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
    this.wavesurfer.un('zoom', this._onZoom);
    this.wavesurfer.un('ready', this._onReady);
    this.wavesurfer.drawer.wrapper.removeEventListener('scroll', this._onScroll);
    if (this.wrapper && this.wrapper.parentNode) {
      this.wrapper.removeEventListener('click', this._onWrapperClick);
      this.wrapper.parentNode.removeChild(this.wrapper);
      this.wrapper = null;
    }
  }

  /**
   * Create a side element to wrap the canvases drawn by this plugin
   *
   */
  createWrapper() {
    this.container.innerHTML = '';
    this.wrapper = this.container.appendChild(document.createElement('div'));
    this.totalduration = this.wrapper.appendChild(document.createElement('span'));
    this.totalduration.className = 'float-right';

    this.nowtime = this.wrapper.appendChild(document.createElement('span'));
    this.nowtime.className = 'float-left';

    this.util.style(this.wrapper, {
      display: 'block',
      position: 'relative',
      userSelect: 'none',
      webkitUserSelect: 'none',
      height: `${this.params.height}px`,
    });
  }

  /**
   * Render the side (also updates the already rendered side)
   *
   */
  render() {
    if (!this.wrapper) {
      this.createWrapper();
    }
    this.updateTotalDuration();
    this.updateNowPosition();
  }

  updateNowPosition() {
    const duration = this.wavesurfer.backend.getCurrentTime() || 0;
    if (duration <= 0) {
      return;
    }
    this.nowtime.innerText = '';
    this.nowtime.innerText = Math.floor(duration / 60) + ':' + ((duration % 60) / 100).toFixed(2).slice(-2) || 0;
  }

  updateTotalDuration() {
    const duration = this.wavesurfer.backend.getDuration() || 0;
    if (duration <= 0) {
      return;
    }
    this.totalduration.innerText = '';
    this.totalduration.innerText = Math.floor(duration / 60) + ':' + ((duration % 60) / 100).toFixed(2).slice(-2) || 0;
  }
}
