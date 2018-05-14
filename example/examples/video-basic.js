import React from 'react';
import { Player, BigPlayButton, Warning, PlayToggle, ProgressControl, ControlBar, CurrentTimeDisplay, TimeDivider, DurationDisplay, VolumeMenuButton, SettingButton, FullscreenToggle } from 'kdan-react-media-player';

export default () => {
  return (
    <Player
      playsInline
      mediaType={'video'}
    >
      <BigPlayButton />
      <Warning />
      <source src="http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" />
      <ControlBar>
        <PlayToggle order={1} />
        <ProgressControl order={2} />
        <CurrentTimeDisplay order={3} />
        <TimeDivider order={3.1} />
        <DurationDisplay order={3.2} />
        <VolumeMenuButton 
          vertical
          order={4} />
        <SettingButton order={5} />
        <FullscreenToggle order={6} />
      </ControlBar>
    </Player>
  );
};

