import React, { useState } from 'react';
import { View, Image as RNImage, StyleSheet } from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { ImageStyle, StyleProp } from 'react-native';

interface CustomImageProps extends Omit<FastImageProps, 'source'> {
  source: Source;
  placeholderSource?: Source;
  style?: any;
}


const Image: React.FC<CustomImageProps> = ({ source, placeholderSource, style, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style}>
      {!loaded && (
        <RNImage
          source={placeholderSource || require('../../assets/placeholder.png')}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      )}
      <FastImage
        source={source}
        style={StyleSheet.absoluteFill}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </View>
  );
};

export default Image; 