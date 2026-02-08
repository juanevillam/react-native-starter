//#region Imports
import React from 'react';

import type { ImageStyle, LayoutChangeEvent, StyleProp } from 'react-native';

import FastImage, {
  type FastImageProps,
  type ImageStyle as FastImageStyle,
} from '@d11/react-native-fast-image';
//#endregion Imports

//#region Types
type ImageProps = {
  cache?: 'cacheOnly' | 'immutable' | 'web';
  onLayout?: (event: LayoutChangeEvent) => void;
  priority?: 'high' | 'low' | 'normal';
  resizeMode?: FastImageProps['resizeMode'];
  source: FastImageProps['source'];
  style: StyleProp<ImageStyle>;
};
//#endregion Types

//#region Helpers
const resolveSource = (
  source: FastImageProps['source'],
  cache?: ImageProps['cache'],
  priority?: ImageProps['priority'],
): FastImageProps['source'] => {
  if (typeof source === 'number') return source;

  return {
    ...source,
    ...(cache && { cache: FastImage.cacheControl[cache] }),
    ...(priority && { priority: FastImage.priority[priority] }),
  };
};
//#endregion Helpers

//#region Component
export const Image = React.memo(
  ({
    cache,
    onLayout,
    priority,
    source,
    resizeMode = 'contain',
    style,
  }: ImageProps) => (
    <FastImage
      onLayout={onLayout}
      resizeMode={resizeMode}
      source={resolveSource(source, cache, priority)}
      style={style as FastImageStyle}
    />
  ),
);
//#endregion Component
