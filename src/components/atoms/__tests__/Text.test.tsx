import React from 'react';
import { render } from '@testing-library/react-native';
import Text from '../Text';

describe('Text atom', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Text>Hello World</Text>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('passes props to RNText', () => {
    const { getByText } = render(<Text numberOfLines={2}>Test</Text>);
    expect(getByText('Test').props.numberOfLines).toBe(2);
  });
});
