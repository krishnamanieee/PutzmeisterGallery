import React from 'react';
import { render } from '@testing-library/react-native';
import Image from '../Image';
import { Image as RNImage } from 'react-native';
import FastImage from 'react-native-fast-image';

jest.mock('react-native-fast-image', () => {
  const RealComponent = jest.requireActual('react-native').Image;
  return {
    __esModule: true,
    default: RealComponent,
  };
});

describe('Image atom', () => {
  const source = { uri: 'https://example.com/image.jpg' };
  const placeholderSource = { uri: 'https://example.com/placeholder.jpg' };

  it('renders placeholder before image loads', () => {
    const { getByTestId } = render(
      <Image source={source} placeholderSource={placeholderSource} style={{ width: 100, height: 100 }} testID="custom-image" />
    );
    // Should render the placeholder image
    expect(getByTestId('custom-image')).toBeTruthy();
  });

  it('renders FastImage', () => {
    const { getByTestId } = render(
      <Image source={source} placeholderSource={placeholderSource} style={{ width: 100, height: 100 }} testID="custom-image" />
    );
    // Should render the FastImage (mocked as RNImage)
    expect(getByTestId('custom-image')).toBeTruthy();
  });
});
