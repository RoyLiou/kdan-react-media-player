import fullscreen from '../utils/fullscreen';

export const OPERATE = 'video-react/OPERATE';
export const FULLSCREEN_CHANGE = 'video-react/FULLSCREEN_CHANGE';
export const PLAYER_ACTIVATE = 'video-react/PLAYER_ACTIVATE';
export const USER_ACTIVATE = 'video-react/USER_ACTIVATE';

export function handleFullscreenChange(isFullscreen) {
  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen
  };
}

export function activate(activity) {
  return {
    type: PLAYER_ACTIVATE,
    activity,
  };
}

export function userActivate(activity) {
  return {
    type: USER_ACTIVATE,
    activity,
  };
}

export function play(operation = {
  action: 'play',
  source: ''
}) {
  this.media.play();

  return {
    type: OPERATE,
    operation
  };
}

export function pause(operation = {
  action: 'pause',
  source: ''
}) {
  this.media.pause();

  return {
    type: OPERATE,
    operation
  };
}

export function loop(operation = {
  action: 'loop',
  source: ''
}) {
  this.media.loop();

  return {
    type: OPERATE,
    operation
  };
}

export function togglePlay(operation = {
  action: 'toggle-play',
  source: ''
}) {
  this.media.togglePlay();

  return {
    type: OPERATE,
    operation
  };
}

// seek video by time
export function seek(time, operation = {
  action: 'seek',
  source: ''
}) {
  this.media.seek(time);

  return {
    type: OPERATE,
    operation
  };
}

// jump forward x seconds
export function forward(seconds, operation = {
  action: `forward-${seconds}`,
  source: ''
}) {
  this.media.forward(seconds);

  return {
    type: OPERATE,
    operation
  };
}

// jump back x seconds
export function replay(seconds, operation = {
  action: `replay-${seconds}`,
  source: ''
}) {
  this.media.replay(seconds);

  return {
    type: OPERATE,
    operation
  };
}

export function changeRate(rate, operation = {
  action: 'change-rate',
  source: ''
}) {
  this.media.playbackRate = rate;

  return {
    type: OPERATE,
    operation
  };
}

export function changeVolume(volume, operation = {
  action: 'change-volume',
  source: ''
}) {
  let v = volume;
  if (volume < 0) {
    v = 0;
  }
  if (volume > 1) {
    v = 1;
  }
  this.media.volume = v;

  return {
    type: OPERATE,
    operation
  };
}

export function mute(muted, operation = {
  action: muted ? 'muted' : 'unmuted',
  source: ''
}) {
  this.media.muted = muted;

  return {
    type: OPERATE,
    operation
  };
}

export function toggleFullscreen(player) {
  if (fullscreen.enabled) {
    if (fullscreen.isFullscreen) {
      fullscreen.exit();
    } else {
      fullscreen.request(this.rootElement);
    }
    return {
      type: OPERATE,
      operation: {
        action: 'toggle-fullscreen',
        source: ''
      }
    };
  }

  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen: !player.isFullscreen
  };
}
