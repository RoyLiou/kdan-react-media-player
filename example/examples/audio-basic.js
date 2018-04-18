import React from 'react';
import { Player, BigPlayButton, PlayToggle, ProgressControl, ControlBar, CurrentTimeDisplay, TimeDivider, DurationDisplay, VolumeMenuButton, SettingButton, FullscreenToggle } from 'video-react';

export default () => {
  return (
    <Player
      playsInline
      mediaType={'audio'}
    >
      <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mp3" />
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

