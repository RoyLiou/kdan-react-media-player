import React from 'react';
import { Player, BigPlayButton, PlayToggle, ProgressControl, ControlBar, CurrentTimeDisplay, TimeDivider, DurationDisplay, VolumeMenuButton, SettingButton, FullscreenToggle } from 'kdan-react-media-player';

export default () => {
  return (
    <Player
      playsInline
      mediaType={'audio'}
    >
      <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg" />
      <ControlBar>
        <PlayToggle order={1} />
        <ProgressControl order={2} />
        <CurrentTimeDisplay order={3} />
        <TimeDivider order={3.1} />
        <DurationDisplay order={3.2} />
        <VolumeMenuButton order={4} />
      </ControlBar>
    </Player>
  );
};

