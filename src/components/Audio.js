import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import { isMediaChild, mediaProperties, throttle } from '../utils';

const propTypes = {
  actions: PropTypes.object,
  player: PropTypes.object,
  children: PropTypes.any,
  startTime: PropTypes.number,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool,
  playsInline: PropTypes.bool,
  src: PropTypes.string,
  className: PropTypes.string,
  preload: PropTypes.oneOf(['auto', 'metadata', 'none']),
  crossOrigin: PropTypes.string,

  onLoadStart: PropTypes.func,
  onWaiting: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onPlaying: PropTypes.func,
  onEnded: PropTypes.func,
  onSeeking: PropTypes.func,
  onSeeked: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onProgress: PropTypes.func,
  onDurationChange: PropTypes.func,
  onError: PropTypes.func,
  onSuspend: PropTypes.func,
  onAbort: PropTypes.func,
  onEmptied: PropTypes.func,
  onStalled: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onLoadedData: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onRateChange: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onResize: PropTypes.func,
};

const defaultProps = {
  preload: 'auto',
};

class Audio extends Component {
  constructor (props, content) {
    super(props, content)
    
    this.audio = null; // the html5 video
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.seek = this.seek.bind(this);
    this.loop = this.loop.bind(this);
    this.forward = this.forward.bind(this);
    this.replay = this.replay.bind(this);
    this.getProperties = this.getProperties.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.handleLoadStart = this.handleLoadStart.bind(this);
    this.handleCanPlay = this.handleCanPlay.bind(this);
    this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleWaiting = this.handleWaiting.bind(this);
    this.handleSeeking = this.handleSeeking.bind(this);
    this.handleSeeked = this.handleSeeked.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSuspend = this.handleSuspend.bind(this);
    this.handleAbort = this.handleAbort.bind(this);
    this.handleEmptied = this.handleEmptied.bind(this);
    this.handleStalled = this.handleStalled.bind(this);
    this.handleLoadedMetaData = this.handleLoadedMetaData.bind(this);
    this.handleLoadedData = this.handleLoadedData.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleProgress = throttle(this.handleProgress.bind(this), 250);
    this.handleKeypress = this.handleKeypress.bind(this);
  }
  
  componentDidMount() {
    this.forceUpdate(); // make sure the children can get the audio property
  }

  // get all audio properties
  getProperties() {
    if (!this.audio) {
      return null;
    }

    return mediaProperties.reduce((properties, key) => {
      properties[key] = this.audio[key];
      return properties;
    }, {});
  }

  // get playback rate
  get playbackRate() {
    return this.audio.playbackRate;
  }

  // set playback rate
  // speed of video
  set playbackRate(rate) {
    this.audio.playbackRate = rate;
  }

  get muted() {
    return this.audio.muted;
  }

  set muted(val) {
    this.audio.muted = val;
  }

  get volume() {
    return this.audio.volume;
  }

  set volume(val) {
    if (val > 1) {
      val = 1;
    }
    if (val < 0) {
      val = 0;
    }
    this.audio.volume = val;
  }

  // play the audio
  play() {
    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .catch(error => { })
        .then(() => { });
    }
  }

  // pause the audio
  pause() {
    const promise = this.audio.pause();
    if (promise !== undefined) {
      promise
        .catch(error => { })
        .then(() => { });
    }
  }

  // Change the video source and re-load the audio:
  load() {
    this.audio.load();
  }

  loop() {
    this.audio.loop = !this.audio.loop
  }

  // Check if your browser can play different types of audio:
  canPlayType(...args) {
    this.audio.canPlayType(...args);
  }

  // toggle play
  togglePlay() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
  
  // seek audio by time
  seek(time) {
    try {
      this.audio.currentTime = time;
    } catch (e) {
      // console.log(e, 'Audio is not ready.')
    }
  }

  // jump forward x seconds
  forward(seconds) {
    this.seek(this.audio.currentTime + seconds);
  }

  // jump back x seconds
  replay(seconds) {
    this.forward(-seconds);
  }

  // Fired when the user agent
  // begins looking for media data
  handleLoadStart(...args) {
    const { actions, onLoadStart } = this.props;
    actions.handleLoadStart(this.getProperties());
    if (onLoadStart) {
      onLoadStart(...args);
    }
  }

  // A handler for events that
  // signal that waiting has ended
  handleCanPlay(...args) {
    const { actions, onCanPlay } = this.props;

    actions.handleCanPlay(this.getProperties());

    if (onCanPlay) {
      onCanPlay(...args);
    }
  }

  // A handler for events that
  // signal that waiting has ended
  handleCanPlayThrough(...args) {
    const { actions, onCanPlayThrough } = this.props;
    actions.handleCanPlayThrough(this.getProperties());

    if (onCanPlayThrough) {
      onCanPlayThrough(...args);
    }
  }

  // A handler for events that
  // signal that waiting has ended
  handlePlaying(...args) {
    const { actions, onPlaying } = this.props;
    actions.handlePlaying(this.getProperties());

    if (onPlaying) {
      onPlaying(...args);
    }
  }

  // Fired whenever the media has been started
  handlePlay(...args) {
    const { actions, onPlay } = this.props;
    actions.handlePlay(this.getProperties());

    if (onPlay) {
      onPlay(...args);
    }
  }

  // Fired whenever the media has been paused
  handlePause(...args) {
    const { actions, onPause } = this.props;
    actions.handlePause(this.getProperties());

    if (onPause) {
      onPause(...args);
    }
  }

  // Fired when the duration of
  // the media resource is first known or changed
  handleDurationChange(...args) {
    const { actions, onDurationChange } = this.props;
    actions.handleDurationChange(this.getProperties());

    if (onDurationChange) {
      onDurationChange(...args);
    }
  }

  // Fired while the user agent
  // is downloading media data
  handleProgress(...args) {
    const { actions, onProgress } = this.props;
    if (this.video) {
      actions.handleProgressChange(this.getProperties());
    }

    if (onProgress) {
      onProgress(...args);
    }
  }

  // Fired when the end of the media resource
  // is reached (currentTime == duration)
  handleEnded(...args) {
    const { loop, player, actions, onEnded } = this.props;
    if (loop) {
      this.seek(0);
      this.play();
    } else if (!player.paused) {
      this.pause();
    }
    actions.handleEnd(this.getProperties());

    if (onEnded) {
      onEnded(...args);
    }
  }

  // Fired whenever the media begins waiting
  handleWaiting(...args) {
    const { actions, onWaiting } = this.props;
    actions.handleWaiting(this.getProperties());

    if (onWaiting) {
      onWaiting(...args);
    }
  }

  // Fired whenever the player
  // is jumping to a new time
  handleSeeking(...args) {
    const { actions, onSeeking } = this.props;
    actions.handleSeeking(this.getProperties());

    if (onSeeking) {
      onSeeking(...args);
    }
  }

  // Fired when the player has
  // finished jumping to a new time
  handleSeeked(...args) {
    const { actions, onSeeked } = this.props;
    actions.handleSeeked(this.getProperties());

    if (onSeeked) {
      onSeeked(...args);
    }
  }

  // Fires when the browser is
  // intentionally not getting media data
  handleSuspend(...args) {
    const { actions, onSuspend } = this.props;
    actions.handleSuspend(this.getProperties());
    if (onSuspend) {
      onSuspend(...args);
    }
  }

  // Fires when the loading of an audio/video is aborted
  handleAbort(...args) {
    const { actions, onAbort } = this.props;
    actions.handleAbort(this.getProperties());
    if (onAbort) {
      onAbort(...args);
    }
  }

  // Fires when the current playlist is empty
  handleEmptied(...args) {
    const { actions, onEmptied } = this.props;
    actions.handleEmptied(this.getProperties());
    if (onEmptied) {
      onEmptied(...args);
    }
  }

  // Fires when the browser is trying to
  // get media data, but data is not available
  handleStalled(...args) {
    const { actions, onStalled } = this.props;
    actions.handleStalled(this.getProperties());

    if (onStalled) {
      onStalled(...args);
    }
  }

  // Fires when the browser has loaded
  // meta data for the audio/video
  handleLoadedMetaData(...args) {
    const { actions, onLoadedMetadata, startTime } = this.props;

    if (startTime && startTime > 0) {
      this.audio.currentTime = startTime;
    }

    actions.handleLoadedMetaData(this.getProperties());

    if (onLoadedMetadata) {
      onLoadedMetadata(...args);
    }
  }

  // Fires when the browser has loaded
  // the current frame of the audio/video
  handleLoadedData(...args) {
    const { actions, onLoadedData } = this.props;
    actions.handleLoadedData(this.getProperties());

    if (onLoadedData) {
      onLoadedData(...args);
    }
  }

  // Fires when the current
  // playback position has changed
  handleTimeUpdate(...args) {
    const { actions, onTimeUpdate } = this.props;
    actions.handleTimeUpdate(this.getProperties());

    if (onTimeUpdate) {
      onTimeUpdate(...args);
    }
  }

  /**
   * Fires when the playing speed of the audio/video is changed
   */
  handleRateChange(...args) {
    const { actions, onRateChange } = this.props;
    actions.handleRateChange(this.getProperties());

    if (onRateChange) {
      onRateChange(...args);
    }
  }

  // Fires when the volume has been changed
  handleVolumeChange(...args) {
    const { actions, onVolumeChange } = this.props;
    actions.handleVolumeChange(this.getProperties());

    if (onVolumeChange) {
      onVolumeChange(...args);
    }
  }

  // Fires when an error occurred
  // during the loading of an audio/video
  handleError(...args) {
    const { actions, onError } = this.props;
    actions.handleError(this.getProperties());
    if (onError) {
      onError(...args);
    }
  }

  handleResize(...args) {
    const { actions, onResize } = this.props;
    actions.handleResize(this.getProperties());
    if (onResize) {
      onResize(...args);
    }
  }

  handleKeypress() {

  }

  renderChildren() {
    const props = {
      ...this.props,
      audio: this.audio,
    };

    // to make sure the children can get video property
    if (!this.audio) {
      return null;
    }

    // only keep <source />, <track />, <MyComponent isMediaChild /> elements
    return React.Children.toArray(this.props.children)
      .filter(isMediaChild)
      .map((c) => {
        let cprops;
        if (typeof c.type === 'string') {
          // add onError to <source />
          if (c.type === 'source') {
            cprops = { ...c.props };
            const preOnError = cprops.onError;
            cprops.onError = (...args) => {
              if (preOnError) {
                preOnError(...args);
              }
              this.handleError(...args);
            };
          }
        } else {
          cprops = props;
        }
        return React.cloneElement(
          c,
          cprops
        );
      });
  }

  render() {
    const {
      loop, preload, src, autoPlay,
      playsInline, muted, crossOrigin, audioId,
    } = this.props;

    return (
      <audio
        className={classNames(
          'video-react-audio',
          this.props.className
        )}
        id={audioId}
        crossOrigin={crossOrigin}
        ref={(c) => { this.audio = c; }}
        muted={muted}
        preload={preload}
        loop={loop}
        playsInline={playsInline}
        autoPlay={autoPlay}
        src={src}
        onLoadStart={this.handleLoadStart}
        onWaiting={this.handleWaiting}
        onCanPlay={this.handleCanPlay}
        onCanPlayThrough={this.handleCanPlayThrough}
        onPlaying={this.handlePlaying}
        onEnded={this.handleEnded}
        onSeeking={this.handleSeeking}
        onSeeked={this.handleSeeked}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onProgress={this.handleProgress}
        onDurationChange={this.handleDurationChange}
        onError={this.handleError}
        onSuspend={this.handleSuspend}
        onAbort={this.handleAbort}
        onEmptied={this.handleEmptied}
        onStalled={this.handleStalled}
        onLoadedMetadata={this.handleLoadedMetaData}
        onLoadedData={this.handleLoadedData}
        onTimeUpdate={this.handleTimeUpdate}
        onRateChange={this.handleRateChange}
        onVolumeChange={this.handleVolumeChange}
      >
        {this.renderChildren()}
      </audio>
    )
  }
};

Audio.propTypes = propTypes
Audio.displayName = 'Audio'

export default Audio;